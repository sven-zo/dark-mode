defmodule Darkmode.Display.Element.Text do
  alias Darkmode.Display.Element
  alias Darkmode.Display.Element.{Text}

  use TypedStruct
  @behaviour Element

  typedstruct do
    field :type, atom(), enforce: true, default: :text
    field :content, String.t(), enforce: true
  end

  @impl Element
  def add(elements, {:text, text}) do
    textElement = %Text{type: :text, content: text}
    {:ok, [textElement | elements]}
  end
end