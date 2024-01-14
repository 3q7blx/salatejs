import React, { useState } from "react";

import Editor from "./editor";

export default function App() {
  const config = [
    {
      type: "paragraph",
      title: "h1",
      children: [
        {
          text: "",
        },
      ],
    },
  ];
  const [value, setValue] = useState(config);
  console.log(value);

  return (
    <Editor
      value={value}
      plugins={[]}
      readOnly={false}
      param={{}}
      onChange={(v) => setValue(v)}
    />
  );
}
