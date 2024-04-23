import { fontSizeMap } from '../const/richTextEditor';
import { EditorCoreHandlerProps } from '@repo/types/richTextEditor';
import { EditorState, Modifier, RichUtils } from 'draft-js';

const toggleFontSize = (
  { editorState, setEditorState }: EditorCoreHandlerProps,
  toggledFontSize: string
) => {
  const selection = editorState.getSelection();

  // Let's just allow one font size at a time. Turn off all active font sizes.
  const nextContentState = Object.keys(fontSizeMap).reduce(
    (contentState, fontSize) => {
      return Modifier.removeInlineStyle(contentState, selection, fontSize);
    },
    editorState.getCurrentContent()
  );

  let nextEditorState = EditorState.push(
    editorState,
    nextContentState,
    'change-inline-style'
  );

  const currentStyle = editorState.getCurrentInlineStyle();

  // Unset style override for current font size.
  if (selection.isCollapsed()) {
    nextEditorState = currentStyle.reduce((editorState, fontSize) => {
      return RichUtils.toggleInlineStyle(
        editorState as EditorState,
        fontSize as string
      );
    }, nextEditorState);
  }

  // If the font size is being toggled on, apply it.
  if (!currentStyle.has(toggledFontSize)) {
    nextEditorState = RichUtils.toggleInlineStyle(
      nextEditorState,
      toggledFontSize
    );
  }

  setEditorState(nextEditorState);
};

export default toggleFontSize;
