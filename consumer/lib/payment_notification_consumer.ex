defmodule Consumer.PaymentNotificationConsumer do
  use GenServer
  use AMQP

  @schema_name "PaymentNotification"
  @default_queue_name "payment_notifications"

  require Logger

  def start_link(opts) do
    GenServer.start_link(__MODULE__, opts)
  end

  def init(_opts) do
    queue = queue_name()
    {:ok, channel} = AMQP.Application.get_channel()
    {:ok, _} = AMQP.Queue.declare(channel, queue, durable: true)

    # Limit unacknowledged messages to 10
    :ok = AMQP.Basic.qos(channel, prefetch_count: 10)
    # Register the GenServer process as a consumer
    {:ok, _consumer_tag} = AMQP.Basic.consume(channel, queue)
    Logger.info("Registered consumer for queue #{queue}.")
    {:ok, channel}
  end

  defp queue_name do
    System.get_env("RABBITMQ_PAYMENT_QUEUE", @default_queue_name)
  end

  # Sent by the broker when the consumer is unexpectedly cancelled (such as after a queue deletion)
  def handle_info({:basic_cancel, %{consumer_tag: _consumer_tag}}, chan) do
    {:stop, :normal, chan}
  end

  # Confirmation sent by the broker after registering this process as a consumer
  def handle_info({:basic_consume_ok, %{consumer_tag: _consumer_tag}}, chan) do
    {:noreply, chan}
  end

  def handle_info(
        {:basic_deliver, payload, %{delivery_tag: tag, redelivered: redelivered}},
        channel
      ) do
    consume(channel, tag, redelivered, payload)

    {:noreply, channel}
  end

  def consume(channel, tag, _redelivered, payload) do
    case Avrora.decode(payload, schema_name: @schema_name) do
      {:ok, decoded} ->
        Task.start(Consumer.Payments, :handle_payment, [decoded])
        :ok = AMQP.Basic.ack(channel, tag)

      _ ->
        Logger.warn("Received invalid message with tag #{tag}, rejecting...")
        Logger.debug("Message #{tag}: #{inspect(payload)}")
        :ok = AMQP.Basic.reject(channel, tag, requeue: false)
    end
  end
end
