import { EditorCoreHandlerProps } from '@repo/types/richTextEditor';
import { EditorState, RichUtils } from 'draft-js';

const addLink = (
  { editorState, setEditorState }: EditorCoreHandlerProps,
  url: string
) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
    url,
  });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity,
  });

  setEditorState(
    RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    )
  );
};

export default addLink;
