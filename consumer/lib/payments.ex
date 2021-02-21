defmodule Consumer.Payments do
  require Logger

  def handle_payment(%{"order_id" => order_id} = payload) do
    Logger.info("Received payment notification for order ID #{order_id}...")
    Logger.debug("The payload I have received: #{inspect(payload)}")
    Logger.debug("Beginning a long-lasting action in background...")
    Process.sleep(3000)
    Logger.info("Finished processing payment for order ID #{order_id}")

    :ok
  end
end
