import React, {useState} from "react";
import EditableTextfield from "../src/EditableTextfield";

const TestPageComponent = () => {
  const [textVal, setTextVal] = useState();

  const updateTextValue = (value) => {
    setTextVal(value);
    console.log("Updated text to " + value);
  }

  return (
    <div>
      <EditableTextfield value={textVal} placeholder="click here to update" updatedTextHandler={updateTextValue} />
    </div>
  );
}

export default TestPageComponent;