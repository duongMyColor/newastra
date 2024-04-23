// Custom Utilities
import hasBlockTypeOf from './hasBlockTypeOf';

// Custom Types
import type { EditorState } from 'draft-js';

const isTextCenterAligned = (state: EditorState, customKey?: string) =>
  hasBlockTypeOf(state, customKey || 'text-align-center');

export default isTextCenterAligned;
