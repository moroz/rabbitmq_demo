FROM elixir:1.11 AS deps

WORKDIR /app

ENV RABBITMQ_HOST rabbit

RUN mix local.hex --force

RUN mix local.rebar --force

COPY mix.exs /app/

RUN mix do deps.get, deps.compile

CMD mix consume


