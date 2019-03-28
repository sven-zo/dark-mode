defmodule DarkmodeDisplayViewTest do
  use ExUnit.Case
  alias Darkmode.Display.View
  doctest View

  describe "create a view" do
    test "with a name" do
      assert %View{name: "NAME"}
    end
  end
end