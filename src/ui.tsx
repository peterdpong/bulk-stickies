import { Button, Columns, Container, Divider, IconButton, IconTrash32, Stack, Textbox, VerticalSpace, render, useInitialFocus } from '@create-figma-plugin/ui'
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

  function handleDeleteSticky(stickyIndex: number) {
    setStickyList(stickyList.toSpliced(stickyIndex, 1));
  }
  
  return (
    <Container space='small'>
      <VerticalSpace space="extraSmall" />
      <Textbox {...useInitialFocus()} onInput={handleInput} onKeyUp={handleKeyUp} placeholder="What's on your mind?" value={inputValue} variant='border' />
      <VerticalSpace space="extraSmall" />
      <Button fullWidth onClick={handleDoneOnClick} disabled={stickyList.length === 0} >Done (Shift + Enter)</Button>
      <VerticalSpace space="extraSmall" />
      <Divider/>
      <VerticalSpace space="extraSmall" />
      <div className="flex flex-col-reverse gap-1">
        {stickyList.map((stickyContents: string, index: number) => {
          return (<div key={`${index}`}  className="flex justify-between items-center bg-slate-100 p-2 rounded-md">
            <p className='fadeIn text-sm'>{stickyContents}</p>
            <button onClick={() => handleDeleteSticky(index)}>
              <IconTrash32/>
            </button>

          </div>)
        })}
      </div>
    </Container>

  )
}

export default render(Plugin)
