// Custom Utilities
import hasBlockTypeOf from './hasBlockTypeOf';

// Custom Types
import type { EditorState } from 'draft-js';

const checkTextAligned = (editorState: EditorState, customKey: string) =>
  hasBlockTypeOf(editorState, customKey);

export default checkTextAligned;
