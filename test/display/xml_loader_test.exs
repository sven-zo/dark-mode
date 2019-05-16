defmodule DarkmodeDisplayXmlloaderTest do
  use ExUnit.Case
  alias Darkmode.Display.Xml_loader
  alias Darkmode.Display.Element.Text
  alias Darkmode.Display.View
  doctest Xml_loader

  describe "parse_folder/1" do
    test "parse the test folder" do
      result = Xml_loader.parse_folder("./test/display/views")

      expect = [
        %View{
          name: "test",
          elements: [%Text{content: "Hello World!"}, %Text{content: "123"}]
        },
        %View{
          name: "another_test",
          elements: [%Text{content: "Hooray!"}]
        }
      ]

      assert result === expect
    end
  end
end
