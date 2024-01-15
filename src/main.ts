import { loadFontsAsync, on, showUI } from '@create-figma-plugin/utilities'

export default function () {

  async function handleCreateBulkStickies (stickies: string[]) {
    for(const stickyContents of stickies) {
      const newSticky = figma.createSticky();
      await loadFontsAsync([newSticky]);
      const newStickyText = newSticky.text;
      newStickyText.characters = stickyContents;
    }
  }

  on('createBulkStickies', handleCreateBulkStickies)

  showUI({
    height: 160,
    width: 240
  })
}
