defmodule ConsumerTest do
  use ExUnit.Case
  doctest Consumer

  test "greets the world" do
    assert Consumer.hello() == :world
  end
end
