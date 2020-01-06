import './sass/style.scss';

import React, {useState, useRef, useEffect} from "react";

const EditableTextfield = ({value, placeholder, updatedTextHandler}) => {
  const [id, setId] = useState(null);
  const textField = useRef(null);
  const [displayText, setDisplayText] = useState(null);

  useEffect(() => {
    console.log('useEffect:EditableTextfield');

    if(id == null){
      setId(generateRandomId());
    }

    setDisplayText(value ? value : placeholder);
  }, [value]);

  const generateRandomId = () => {
    // generates a random 5 digit id which should be enough to prevent conflict between many instances of 
    // this component on the one page
    return Math.floor(Math.random()*10000);
  }

  const onChangeHandler = (evnt) => {
    console.log('textfield changed');
  }

  const onBlurHandler = (evnt) => {
    console.log('textfield blur value is ' + textField.current.innerText);

    setDisplayText(textField.current.innerText ? textField.current.innerText : placeholder);
    updatedTextHandler(textField.current.innerText == placeholder ? "" : textField.current.innerText);
  }

  const onClickHandler = (evnt) => {
    setDisplayText(value);
  }

  return (
    <div ref={textField} className="editableTextfield" contentEditable="true" id={`editableTextfield-${id}`} 
      onInput={e => onChangeHandler(e)} onBlur={e => onBlurHandler(e)} onClick={e => onClickHandler(e)}>
      {displayText}
    </div>
  );
}

export default EditableTextfield;