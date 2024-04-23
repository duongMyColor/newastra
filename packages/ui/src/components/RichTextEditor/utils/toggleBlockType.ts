// Core
import { RichUtils } from 'draft-js';

// Custom Types
import type { EditorState } from 'draft-js';
import { Dispatch, SetStateAction } from 'react';

const toggleBlockType = (
  editorState: EditorState,
  setEditorState: Function,
  blockType: string
) => {
  const updatedState = RichUtils.toggleBlockType(editorState, blockType);

  setEditorState(updatedState);
};

export default toggleBlockType;
