defmodule Consumer.PaymentNotificationConsumer do
  use GenServer

  require Logger

  def start_link(opts) do
    GenServer.start_link(__MODULE__, opts)
  end

  def init(_opts) do
    Logger.info("PaymentNotificationConsumer starting...")

    {:ok, []}
  end
end
