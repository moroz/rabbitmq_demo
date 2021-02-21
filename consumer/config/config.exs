use Mix.Config

config :lager,
  handlers: [
    lager_console_backend: [
      level: :critical
    ]
  ]

rabbitmq_host = System.get_env("RABBITMQ_HOST", "localhost")

config :amqp,
  connections: [
    default: [url: "amqp://#{rabbitmq_host}"]
  ],
  channels: [
    default: [connection: :default]
  ]

default_schema_path = Path.expand("../avro")

config :avrora,
  schemas_path: System.get_env("AVRO_SCHEMA_DIR", default_schema_path),
  registry_schemas_autoreg: true,
  convert_null_values: true,
  names_cache_ttl: :timer.minutes(60)
