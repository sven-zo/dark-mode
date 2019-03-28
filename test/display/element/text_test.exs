defmodule DarkmodeDesplayElementTest do
  use ExUnit.Case
  alias Darkmode.Display.Element.Text
  doctest Text

  describe "add/2" do
    test "add text element to empty list" do
      expected = {:ok, [%Text{type: :text, content: "Hello World!"}]}
      element = Text.add([], {:text, "Hello World!"})
      assert expected == element
    end
  end
end