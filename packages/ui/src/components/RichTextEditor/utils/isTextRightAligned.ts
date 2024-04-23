// Custom Utilities
import hasBlockTypeOf from './hasBlockTypeOf';

// Custom Types
import type { EditorState } from 'draft-js';

const isTextRightAligned = (state: EditorState, customKey?: string) =>
  hasBlockTypeOf(state, customKey || 'text-align-right');

export default isTextRightAligned;
