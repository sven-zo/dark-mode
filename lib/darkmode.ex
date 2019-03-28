defmodule Darkmode do
  use Application

  def start(_type, _args) do
    Darkmode.Supervisor.start_link
  end
end
