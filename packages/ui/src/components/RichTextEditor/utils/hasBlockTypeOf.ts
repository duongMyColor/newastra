// Custom Types
import type { EditorState } from 'draft-js';

const hasBlockTypeOf = (state: EditorState, blockType: string) => {
  const selection = state.getSelection();
  const currentContent = state.getCurrentContent();

  const currentBlockType = currentContent
    .getBlockForKey(selection.getStartKey())
    .getType();

  return currentBlockType === blockType;
};

export default hasBlockTypeOf;
