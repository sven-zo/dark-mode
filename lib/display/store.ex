defmodule Darkmode.Display.Store do
  use GenServer

  # Client

  def start_link do
    GenServer.start_link(__MODULE__, %{}, name: :display_store)
  end

  # Callbacks

end