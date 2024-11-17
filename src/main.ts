import { loadFontsAsync, on, showUI } from '@create-figma-plugin/utilities'

export default function () {

  const MAX_STICKIES_PER_ROW = 5;
  const STICKY_SPACING = 20;
  const STICKY_SIZE_DEFAULT = 240;

  async function handleCreateBulkStickies (stickies: string[]) {
    const startPosition = figma.viewport.center
    let placementPosition = startPosition
    let currentNumInRow = 1;

    for(const stickyContents of stickies) {
      const newSticky = figma.createSticky();
      await loadFontsAsync([newSticky]);
      const newStickyText = newSticky.text;
      newStickyText.characters = stickyContents;
      newSticky.x = placementPosition.x
      newSticky.y = placementPosition.y

      let newXPosition = placementPosition.x + STICKY_SIZE_DEFAULT + STICKY_SPACING;
      let newYPosition = placementPosition.y;
      if(currentNumInRow == MAX_STICKIES_PER_ROW) {
        newYPosition += STICKY_SIZE_DEFAULT + STICKY_SPACING

        currentNumInRow = 1;
        newXPosition = startPosition.x;
      } else {
        currentNumInRow++;
      }

      placementPosition = {x: newXPosition, y: newYPosition}
    }
  }

  on('createBulkStickies', handleCreateBulkStickies)

  showUI({
    height: 320,
    width: 280
  })
}
