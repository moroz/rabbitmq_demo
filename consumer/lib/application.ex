defmodule Consumer.Application do
  use Application

  require Logger

  def start(_type, _args) do
    children = [
      Consumer.PaymentNotificationConsumer
    ]

    Logger.info("Hello, I am a consumer. All I do is consume...")
    opts = [strategy: :one_for_one, name: Consumer.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
