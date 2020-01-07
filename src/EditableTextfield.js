import './sass/style.scss';

import React, {useState, useRef, useEffect} from "react";

const EditableTextfield = ({value, placeholder, updatedTextHandler}) => {
  const [id, setId] = useState(null);
  const textField = useRef(null);
  const [displayText, setDisplayText] = useState(null);
  const [showActionButtons, setShowActionButtons] = useState(false);

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
    setShowActionButtons(true);
  }

  const onBlurHandler = (evnt) => {
    console.log('textfield blur value is ' + textField.current.innerText);

    setDisplayText(textField.current.innerText ? textField.current.innerText : placeholder);
    setShowActionButtons(false);
    updatedTextHandler(textField.current.innerText == placeholder ? "" : textField.current.innerText);
  }

  const onClickHandler = (evnt) => {
    setDisplayText(value);
  }

  const onCancelHandler = (evnt) => {
    console.log('Cancel text');
    setShowActionButtons(false);
    setDisplayText(value ? value : placeholder);
  }

  const onSaveHandler = (evnt) => {
    console.log('Save text');
    
    setDisplayText(textField.current.innerText ? textField.current.innerText : placeholder);
    setShowActionButtons(false);
    updatedTextHandler(textField.current.innerText == placeholder ? "" : textField.current.innerText);
  }

  return (
    <div className="editableTextfieldContainer">
      <div ref={textField} className="editableTextfield" contentEditable="true" id={`editableTextfield-${id}`} 
        onInput={e => onChangeHandler(e)} onBlur={e => onBlurHandler(e)} onClick={e => onClickHandler(e)}>
        {displayText}
      </div>
      <div className={`editableTextfieldActionsContainer${showActionButtons ? '' : ' hidden'}`}>
        <div className="editableTextfieldActions">
          <button className="editableTextfieldAction" onClick={evnt => onSaveHandler(evnt)}>+</button>
          <button className="editableTextfieldAction" onClick={evnt => onCancelHandler(evnt)}>X</button>
        </div>
      </div>
    </div>
  );
}

export default EditableTextfield;