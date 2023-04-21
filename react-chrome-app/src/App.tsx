import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { getSimpleContent } from "../utils/getSimpleContent";

function App() {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    // Save the textarea content to the state

    console.log("Textarea content:", text);

    const html = document.documentElement.outerHTML;
    getSimpleContent(html);
  };

  return (
    <div>
      <TextareaAutosize
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something..."
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
