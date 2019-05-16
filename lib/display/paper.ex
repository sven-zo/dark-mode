defmodule Darkmode.Display.Paper do
  use Export.Python
  use GenServer

  # Client

  def start_link do
    GenServer.start_link(__MODULE__, %{}, name: :display_paper)
  end

  def init(state) do
    {:ok, py} = Python.start(python_path: Path.expand("lib/display/paper/python"))
    # %{state | py: py} mag niet want is geen bestaande
    new_state = Map.put(state, :py, py)
    {:ok, new_state}
  end

  # def command_text(server_pid) do
  #   GenServer.cast(server_pid, {:command_text})
  # end

  def test_python(server_pid) do
    GenServer.call(server_pid, :test_python)
  end

  def get_state(server_pid) do
    GenServer.call(server_pid, :get_state)
  end

  # Callbacks

  # def handle_cast(:command_text, state) do
  #   py = state[:py]
  #   py |> Python.call(upcase("hello"), from_file: "test")
  #   {:noreply, state}
  # end

  def handle_call(:test_python, _from, state) do
    py = state.py
    result = py |> Python.call(upcase("hello from python"), from_file: "paper_test_python")
    {:reply, {:ok, result}, state}
  end

  def handle_call(:get_state, _from, state) do
    {:reply, {:ok, state}, state}
  end
end
