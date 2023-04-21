import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

function App() {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    // Save the textarea content to the state
    console.log("Textarea content:", text);
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
