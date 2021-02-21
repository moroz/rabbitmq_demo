defmodule Consumer.MixProject do
  use Mix.Project

  def project do
    [
      app: :consumer,
      version: "0.1.0",
      elixir: "~> 1.11",
      start_permanent: true,
      deps: deps(),
      aliases: aliases()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      mod: {Consumer.Application, []},
      extra_applications: [:lager, :logger, :amqp]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:amqp, "~> 2.0"},
      {:avrora, "~> 0.17"}
    ]
  end

  defp aliases do
    [
      consume: "run --no-halt"
    ]
  end
end
