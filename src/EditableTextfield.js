import './sass/style.scss';

import React, {useState, useRef, useEffect} from "react";

const EditableTextfield = ({value, placeholder, updatedTextHandler}) => {
  const [id, setId] = useState(null);
  const textField = useRef(null);
  const actionBtns = useRef(null);
  const [displayText, setDisplayText] = useState(null);
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [clickOutEventRegistered, setClickOutEventRegistered] = useState(false);

  useEffect(() => {
    console.log('useEffect:EditableTextfield');

    if(id == null){
      setId(generateRandomId());
    }

    setDisplayText(value ? value : placeholder);

    if(!clickOutEventRegistered){
      document.addEventListener("click", documentClickEventListener);
      setClickOutEventRegistered(true);
    }
  }, [value]);

  const generateRandomId = () => {
    // generates a random 5 digit id which should be enough to prevent conflict between many instances of 
    // this component on the one page
    return Math.floor(Math.random()*10000);
  }

  const documentClickEventListener = (evnt) => {
    let clickOutElement = document.getElementById(actionBtns.current.id);

    if(clickOutElement == null) return;

    if(clickOutElement.className.includes('hidden')) return;

    // if the user is clicking into the textfield
    if(evnt.target == document.querySelector(`#editableTextfield-${id}`)){
      return;
    }

    let targetElement = evnt.target;

    do {
      if (targetElement == clickOutElement) {
        return;
      }
      // Go up the DOM.
      targetElement = targetElement.parentNode;
    } while (targetElement);

    onSaveHandler(evnt);
  }

  const onChangeHandler = (evnt) => {
    setShowActionButtons(true);
  }

  const onClickHandler = (evnt) => {
    evnt.stopPropagation();
    setDisplayText(value);
  }

  const onCancelHandler = (evnt) => {
    evnt.stopPropagation();
    setShowActionButtons(false);
    textField.current.innerText = value ? value : placeholder;
  }

  const onSaveHandler = (evnt) => {
    setShowActionButtons(false);
    updatedTextHandler(textField.current.innerText == placeholder ? "" : textField.current.innerText);
  }

  return (
    <div className="editableTextfieldContainer">
      <div ref={textField} className="editableTextfield" contentEditable="true" id={`editableTextfield-${id}`} 
        onInput={e => onChangeHandler(e)} onClick={e => onClickHandler(e)}>
        {displayText}
      </div>
      <div ref={actionBtns} className={`editableTextfieldActionsContainer${showActionButtons ? '' : ' hidden'}`} id={`editableTextfieldActionsContainer-${id}`}>
        <div className="editableTextfieldActions" id={`editableTextfieldActions-${id}`}>
          <button className="editableTextfieldAction" onClick={evnt => onSaveHandler(evnt)}>
            <svg width="24" height="24" viewBox="1 -2 24 24" focusable="false" role="presentation">
              <path d="M6.735 12.322a1 1 0 0 0-1.47 1.356l3.612 3.919c.537.526 1.337.526 1.834.03l.364-.359a2335.638 2335.638 0 0 0 3.939-3.883l.04-.04a492.598 492.598 0 0 0 3.658-3.643 1 1 0 0 0-1.424-1.404 518.42 518.42 0 0 1-3.64 3.625l-.04.04a2049.114 2049.114 0 0 1-3.775 3.722l-3.098-3.363z"></path>
            </svg>
          </button>
          <button className="editableTextfieldAction" onClick={evnt => onCancelHandler(evnt)}>
            <svg width="24" height="24" viewBox="1 -2 24 24" focusable="false" role="presentation">
              <path d="M12 10.586L6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 0 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 1 0-1.414-1.414L12 10.586z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditableTextfield;