defmodule Darkmode.Display.Element do
  @callback add(list(), tuple()) :: {:ok, List} | {:error, List}
end