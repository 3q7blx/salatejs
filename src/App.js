import React, { useState } from "react";

import Editor from "./editor";
import AppStyle from "./App.module.css";

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
    <div className={AppStyle.editor}>
      <Editor
        value={value}
        plugins={[]}
        readOnly={false}
        param={{}}
        onChange={(v) => setValue(v)}
      />
    </div>
  );
}
