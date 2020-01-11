import React, {useState} from "react";
import EditableTextfield from "../src/EditableTextfield";

const TestPageComponent = () => {
  const [companyName, setCompanyName] = useState();
  const [author, setAuthor] = useState();

  const updatedTextHandler = (text) => {
    setCompanyName(text);
  }

  var styles = {
    width: '300px'
  };

  var styles2 = {
    width: '400px'
  };

  return (
    <div>
      <div style={styles}>
        <label>Company Name</label>
        <EditableTextfield value={companyName} placeholder="click here to update" updatedTextHandler={updatedTextHandler} />
      </div>
      <div style={styles2}>
        <label>Author</label>
        <EditableTextfield value={author} placeholder="click here to update" updatedTextHandler={setAuthor} />
      </div>
    </div>
  );
}

export default TestPageComponent;