defmodule Darkmode.Display.Xml_loader do
  import SweetXml
  alias Darkmode.Display.View
  alias Darkmode.Display.Element.Text

  def parse_folder(p) do
    path = Path.expand(p)
    dir = File.ls(path)
    # :enoent = file not found
    case dir do
      {:error, reason} -> {:error, reason}
      {:ok, files} -> Enum.map(files, &read_file(&1, path))
    end
  end

  def read_file(f, path) do
    file = File.read(path <> "/" <> f)

    case file do
      {:error, reason} -> {:error, reason}
      {:ok, file} -> parse_file(file)
    end
  end

  def parse_file(f) do
    view = f |> xpath(~x[//view])
    elements = f |> xpath(~x[//view/*]l)
    view_name = view |> xpath(~x"//@name")

    processedElements =
      Enum.map(elements, fn element ->
        {:xmlElement, label, _, _, _, _, _, _, content, _, _, _} = element

        case label do
          :text -> %Text{content: text_content(content)}
        end
      end)

    %View{name: to_string(view_name), elements: processedElements}
  end

  def text_content([{:xmlText, _, _, _, text, _}]) do
    to_string(text)
  end
end
