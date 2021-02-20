FROM elixir:1.11

WORKDIR /app

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get -y install apt-utils apt-transport-https wget inotify-tools locales

RUN sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale LANG=en_US.UTF-8

ENV LANG en_US.UTF-8

RUN mix local.hex --force

RUN mix local.rebar --force

CMD mix run --no-halt

