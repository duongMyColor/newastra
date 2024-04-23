import { EditorCoreHandlerProps } from '@repo/types/richTextEditor';
import { RichUtils } from 'draft-js';

const removeLink = ({
  editorState,
  setEditorState,
}: EditorCoreHandlerProps) => {
  const selection = editorState.getSelection();
  if (!selection.isCollapsed()) {
    setEditorState(RichUtils.toggleLink(editorState, selection, null));
  }
};

export default removeLink;
