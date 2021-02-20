defmodule Consumer.Application do
  use Application

  require Logger

  def start(_type, _args) do
    children = [
      Consumer.PaymentNotificationConsumer
    ]

    opts = [strategy: :one_for_one, name: Consumer.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
