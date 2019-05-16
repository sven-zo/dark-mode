defmodule DarkmodeDisplayPaperTest do
  use ExUnit.Case
  alias Darkmode.Display.Paper
  doctest Paper

  # test "command_text/1", %{server: pid} do
  #   assert :ok == Paper.command_text(pid)
  # end

  test "test_python/1" do
    {:ok, pid} = Paper.start_link()
    assert {:ok, "HELLO FROM PYTHON"} == Paper.test_python(pid)
  end
end
