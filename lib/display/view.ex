defmodule Darkmode.Display.View do
  @moduledoc """
  A struct representing a view
  """
  
  use TypedStruct

  @typedoc "A view"
  typedstruct do
    field :name, String.t(), enforce: true
    field :elements, list()
  end
end