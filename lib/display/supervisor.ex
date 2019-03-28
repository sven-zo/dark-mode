defmodule Darkmode.Display.Supervisor do
  use Supervisor
  alias Darkmode.Display.{Store, Paper, Web}

  def start_link do
    Supervisor.start_link(__MODULE__, [])
  end

  def init(_) do
    children = [
      worker(Store, []),
      worker(Paper, []),
      worker(Web, [])
    ]

    supervise(children, strategy: :one_for_one)
  end
end