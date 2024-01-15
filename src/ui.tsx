import { Textbox, render } from '@create-figma-plugin/ui'
import { JSX, h } from 'preact'
import '!./output.css'
import { useState } from 'preact/hooks';
import { emit } from '@create-figma-plugin/utilities';

function Plugin () {
  const [stickyList, setStickyList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setInputValue(newValue);
  }

  function handleKeyUp(event: JSX.TargetedKeyboardEvent<HTMLInputElement>) {
    const keyUpValue = event.key;
    if(keyUpValue === 'Enter') {
      if(event.shiftKey) {
        emit('createBulkStickies', stickyList);
        setStickyList([]);
      } else {
        setStickyList((prevState) => { return prevState.concat(inputValue)});
        setInputValue('');
      }
    } 
  }
  
  return (
    <div>
    <Textbox onInput={handleInput} onKeyUp={handleKeyUp} placeholder="Type your notes!" value={inputValue} />
    {stickyList.map((stickyContents: string) => {
      return <h1>{stickyContents}</h1>
    })}
    </div>

  )
}

export default render(Plugin)
