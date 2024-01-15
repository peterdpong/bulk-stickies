import { Button, Container, Divider, Stack, Textbox, VerticalSpace, render, useInitialFocus } from '@create-figma-plugin/ui'
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
      } else if(inputValue.length > 0) {
        setStickyList((prevState) => { return prevState.concat(inputValue)});
        setInputValue('');
      }
    } 
  }

  function handleDoneOnClick(event: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    emit('createBulkStickies', stickyList);
    setStickyList([]);
  }
  
  return (
    <Container space='small'>
      <VerticalSpace space="extraSmall" />
      <Textbox {...useInitialFocus()} onInput={handleInput} onKeyUp={handleKeyUp} placeholder="What's on your mind?" value={inputValue} variant='border' />
      <VerticalSpace space="extraSmall" />

      {stickyList.length > 0 && 
      <div>
        <Button fullWidth onClick={handleDoneOnClick} >Done (Shift + Enter)</Button>
        <VerticalSpace space="extraSmall" />
      </div>}

      <Divider/>
      <div className="flex flex-col-reverse gap-1">
        {stickyList.map((stickyContents: string, index: number) => {
          return <h1 key={`${index}`} className='fadeIn'>{stickyContents}</h1>
        })}
      </div>
      
    </Container>

  )
}

export default render(Plugin)
