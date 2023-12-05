import React, { useState, useMemo, useCallback } from "react";
import { createEditor, Transforms, Editor, Element } from "slate";
import { Slate, Editable, withReact } from "slate-react";

function App() {
  // Create a Slate editor object that won't change across renders.
  // editor 即该编辑器的对象实例
  // const editor = useMemo(() => withReact(createEditor()), []);
  const [editor] = useState(() => withReact(createEditor()));

  // 初始化 value ，即编辑器的内容。其数据格式类似于 vnode ，下文会详细结实。
  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "我是一行文字" }],
    },
  ];
  const [value, setValue] = useState(initialValue);

  // Define a React component renderer for our code blocks.
  const CodeElement = (props) => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    );
  };

  const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>;
  };

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(newValue) => setValue(newValue)}
      >
        <Editable
          renderElement={renderElement}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return;
            }

            switch (event.key) {
              // When "`" is pressed, keep our existing code block logic.
              case "`": {
                event.preventDefault();
                const [match] = Editor.nodes(editor, {
                  match: (n) => n.type === "code",
                });
                Transforms.setNodes(
                  editor,
                  { type: match ? "paragraph" : "code" },
                  { match: (n) => Editor.isBlock(editor, n) }
                );
                break;
              }

              // When "B" is pressed, bold the text in the selection.
              case "b": {
                event.preventDefault();
                Editor.addMark(editor, "bold", true);
                break;
              }
              default: {
                //
              }
            }
          }}
        />
      </Slate>
    </div>
  );
}

export default App;
