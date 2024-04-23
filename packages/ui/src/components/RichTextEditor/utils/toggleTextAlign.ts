// Custom Utilities
import { Dispatch } from 'react-admin';
import toggleBlockType from './toggleBlockType';

// Custom Types
import type { EditorState } from 'draft-js';
import { SetStateAction } from 'react';

const toggleTextAlign = (
  state: EditorState,
  stateHandler: Dispatch<SetStateAction<EditorState>>,
  key?: string
) => toggleBlockType(state, stateHandler, key || 'text-align-right');

export default toggleTextAlign;
