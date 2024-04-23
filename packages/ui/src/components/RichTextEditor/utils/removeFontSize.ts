import { EditorState, Modifier } from 'draft-js';
import { fontSizeMap } from '../const/richTextEditor';
import { EditorCoreHandlerProps } from '@repo/types/richTextEditor';

const removeFontSize = ({
  editorState,
  setEditorState,
}: EditorCoreHandlerProps) => {
  const selection = editorState.getSelection();
  let contentState = editorState.getCurrentContent();

  // Remove all font size styles from the current selection
  Object.keys(fontSizeMap).forEach((fontSize) => {
    console.log('fontSize: ', fontSize);

    contentState = Modifier.removeInlineStyle(
      contentState,
      selection,
      fontSize
    );
  });

  // Push the new content state to the editor state
  const newEditorState = EditorState.push(
    editorState,
    contentState,
    'change-inline-style'
  );

  setEditorState(newEditorState);
};

export default removeFontSize;
