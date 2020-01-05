import './sass/style.scss';

import React, {useState, useRef, useEffect} from "react";

const EditableTextfield = ({value, placeholder, updatedTextHandler}) => {
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const itemsContainer = useRef();
  const [id, setId] = useState(null);

  useEffect(() => {
    console.log('useEffect:AutoCompleteTextBox');

    if(id == null){
      setId(generateRandomId());
    }
  });

  const generateRandomId = () => {
    // generates a random 5 digit id which should be enough to prevent conflict between many instances of 
    // this component on the one page
    return Math.floor(Math.random()*10000);
  }

  return (
    <div className="editableTextfield" id={`editableTextfield-${id}`}>
      {value ? value : placeholder}
    </div>
  );
}

const Items = ({items, deleteItemHandler, emptyTagsText}) => {
  if(items.length == 0){
    return (
      <span className="autocompleteTextBoxNoItems__text">{!emptyTagsText || emptyTagsText.trim().length == 0 ? "None" : emptyTagsText}</span>
    );
  }

  return (
    <React.Fragment>
      {items.map(
        (item, index) => {
          return (
            <AutoCompleteItem key={index} item={item} deleteItemHandler={deleteItemHandler}/>
          );
        }
      )}
    </React.Fragment>
  );
}

const AddNewItemButton = ({shouldShow, onClickHandler}) => {
  return (
    <div className={`autocompleteTextBoxItem${shouldShow ? '' : ' hidden'}`}>
      <button className="autocompleteTextBoxAddBtn" onClick={evnt => onClickHandler(evnt)}>+</button>
    </div>
  )
}

const AutoCompleteItem = ({itemIndex, item, deleteItemHandler}) => {
  return (
    <div className="autocompleteTextBoxItem" onClick={evnt => evnt.stopPropagation()}>
      <span className="autocompleteTextBoxItem__text">{item}</span>
      <span className="autocompleteTextBoxItem__remove" onClick={event => deleteItemHandler(item)}>x</span>
    </div>
  );
}

const NewItem = ({filterOptionsHandler, selectedItems, selectNewItemHandler, onBlurHandler, shouldShow, id}) => {
  const txtBoxRef = useRef(null);
  const newItemRef = useRef(null);
  const idRef = useRef(id);
  const [parentHeight, setParentHeight] = useState(0);
  const [parentWidth, setParentWidth] = useState(0);
  const [clickOutEventRegistered, setClickOutEventRegistered] = useState(0);
  const [newItemsOptions, setNewItemsOptions] = useState([]);

  useEffect(() => {
    console.log('useEffect:NewItem' + ' shouldShow:' + shouldShow);
    txtBoxRef.current.focus();

    setParentHeight(txtBoxRef.current.clientHeight);
    setParentWidth(txtBoxRef.current.clientWidth);

    setNewItemsOptions(getNotSelectedOptions(''));

    if(!clickOutEventRegistered && id != null){
      idRef.current = id;
      
      document.addEventListener("click", documentClickEventListener);
      setClickOutEventRegistered(true);
    }
  }, [txtBoxRef, shouldShow]);

  const newItemUpdatedEventHandler = (evnt) => {
    let options = getNotSelectedOptions(evnt.target.textContent.trim());

    setNewItemsOptions(options);
  }

  const getNotSelectedOptions = (filterText) => {
    let options = filterOptionsHandler(filterText);

    // remove options which are already selected
    let notSelectedOptions = options.filter(o => selectedItems.indexOf(o) < 0);

    if(notSelectedOptions.length == 0){
      return ["No further options available"];
    }

    return notSelectedOptions;
  }

  const documentClickEventListener = (evnt) => {
    let clickOutElement = document.getElementById(newItemRef.current.id);

    if(clickOutElement == null) return;

    if(clickOutElement.className.includes('hidden')) return;

    // if the user is clicking into the items area of an open drop down then do nothing
    if(evnt.target == document.querySelector(`#autocompleteTextBox-${idRef.current} .autocompleteTextBox__items`)
      || evnt.target == document.querySelector(`#autocompleteTextBox-${idRef.current} .autocompleteTextBoxAddBtn`)){
      txtBoxRef.current.innerText = '';
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

    txtBoxRef.current.innerText = '';
    onBlurHandler(evnt);
  }

  const selectItemHandler = (item) => {
    txtBoxRef.current.innerText = '';
    selectNewItemHandler(item);
  }

  return (
    <div ref={newItemRef} id={`autocompleteTextBoxNewItem-${id}`} className={`autocompleteTextBoxNewItem${shouldShow ? '' : ' hidden'}`} style={{width:parentWidth, height:parentHeight}}>
      <div className="autocompleteTextBoxNewItem__container">
        <div ref={txtBoxRef} className="autocompleteTextBoxNewItem__text" contentEditable="true" onClick={evnt => evnt.stopPropagation()} onInput={evnt => newItemUpdatedEventHandler(evnt)}></div>
        <ul className="autocompleteTextBoxNewItem__list">
          {newItemsOptions.map(
            (item, index) => {
              return (
                <li key={index} className="autocompleteTextBoxNewItem__listitem" onClick={evnt => selectItemHandler(item)}>{item}</li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
}

export default EditableTextfield;