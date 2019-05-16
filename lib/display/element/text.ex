defmodule Darkmode.Display.Element.Text do
  use TypedStruct

  typedstruct do
    field(:content, String.t(), enforce: true)
  end
end
