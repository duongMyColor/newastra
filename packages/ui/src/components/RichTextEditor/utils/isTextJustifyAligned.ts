// Custom Utilities
import hasBlockTypeOf from './hasBlockTypeOf';

// Custom Types
import type { EditorState } from 'draft-js';

const isTextJustifyAligned = (state: EditorState, customKey?: string) =>
  hasBlockTypeOf(state, customKey || 'text-align-justify');

export default isTextJustifyAligned;
