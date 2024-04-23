import type { EditorState } from 'draft-js';

const genEditorWrapperClassName = ({
  editorState,
}: {
  editorState: EditorState;
}) => {
  let className = 'RichEditor-editor';
  let contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  return className;
};

export { genEditorWrapperClassName };
