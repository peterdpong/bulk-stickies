import { Button, Container, Divider, IconTrash24, Text, TextboxMultiline, VerticalSpace, render, useInitialFocus } from '@create-figma-plugin/ui'
import { JSX, h, Fragment } from 'preact'
import '!./output.css'
import { useState } from 'preact/hooks';
import { emit } from '@create-figma-plugin/utilities';

function Plugin () {
  const [stickyList, setStickyList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  function handleInput(event: JSX.TargetedEvent<HTMLTextAreaElement>) {
    const newValue = event.currentTarget.value;
    setInputValue(newValue);
  }

  function handleKeyDown(event: JSX.TargetedKeyboardEvent<HTMLTextAreaElement>) {
    const keyUpValue = event.key;
    if(keyUpValue === 'Enter') {
      if(event.shiftKey && stickyList.length > 0 && inputValue.length === 0) {
        emit('createBulkStickies', stickyList);
        setStickyList([]);
        event.preventDefault();
        return;
      } 
      
      if(!event.shiftKey && inputValue.trim().length > 0) {
        setStickyList((prevState) => { return prevState.concat(inputValue.trim())});
        setInputValue('');
        event.preventDefault();
      }
    } 
  }

  function handleDoneOnClick(event: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    emit('createBulkStickies', stickyList);
    setStickyList([]);
  }

  function handleDeleteSticky(stickyIndex: number) {
    const newStickyList = [...stickyList];
    newStickyList.splice(stickyIndex, 1);
    setStickyList(newStickyList);
  }
  
  return (
    <Container space='small'>
      <VerticalSpace space="extraSmall" />
      <TextboxMultiline {...useInitialFocus()} onInput={handleInput} onKeyDown={handleKeyDown} placeholder="Your ideas here. [Enter]" value={inputValue} />
      <VerticalSpace space="extraSmall" />
      <Divider/>
      <VerticalSpace space="extraSmall" />
      <div className="flex flex-col-reverse gap-1">
        {stickyList.map((stickyContents: string, index: number) => {
          return (<div key={`${index}`} style={{'border': '1px solid #eee'}} className="fadeIn flex justify-between items-center py-2 px-2 rounded-md">
            <p style={{'word-break': 'break-word'}} className='text-xs wrap-break-word'>{stickyContents}</p>
            <button className="trashButton" onClick={() => handleDeleteSticky(index)}>
              <IconTrash24 />
            </button>
          </div>)
        })}
      </div>
      {stickyList.length > 0 && (
        <>
          <VerticalSpace space="extraSmall" />
          <Button fullWidth onClick={handleDoneOnClick} disabled={stickyList.length === 0} >Insert stickies [Shift + Enter]</Button>
        </>
      )}
      {stickyList.length === 0 && (
        <div className="flex flex-col items-center text-center gap-2 mt-4">
           <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38 56.75V40.3438M38 40.3438C39.6184 40.3438 41.1894 40.1387 42.6875 39.7531M38 40.3438C36.3816 40.3438 34.8106 40.1387 33.3125 39.7531M45.0312 63.1231C42.7538 63.5553 40.4031 63.7812 38 63.7812C35.5969 63.7812 33.2462 63.5553 30.9688 63.1231M42.6875 70.5688C41.1469 70.73 39.5831 70.8125 38 70.8125C36.4169 70.8125 34.8531 70.73 33.3125 70.5688M45.0312 56.75V56.1509C45.0312 53.0794 47.0884 50.4531 49.7453 48.9116C56.7359 44.8556 61.4375 37.2894 61.4375 28.625C61.4375 15.6808 50.9441 5.1875 38 5.1875C25.0558 5.1875 14.5625 15.6808 14.5625 28.625C14.5625 37.2894 19.2639 44.8556 26.2548 48.9116C28.9117 50.4531 30.9688 53.0794 30.9688 56.1509V56.75" stroke="#D3D3D3" stroke-width="4.6875" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <Text className="text-gray-400">Great ideas take time.</Text>
        </div>



     

      )}
    </Container>

  )
}

export default render(Plugin)
