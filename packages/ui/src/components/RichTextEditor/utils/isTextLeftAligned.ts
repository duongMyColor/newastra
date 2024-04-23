// Custom Utilities
import hasBlockTypeOf from './hasBlockTypeOf';

// Custom Types
import type { EditorState } from 'draft-js';

const isTextLeftAligned = (state: EditorState, customKey?: string) =>
  hasBlockTypeOf(state, customKey || 'text-align-left');

export default isTextLeftAligned;
