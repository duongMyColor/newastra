import { colorStyleMap } from '../const/richTextEditor';
import { EditorCoreHandlerProps } from '@repo/types/richTextEditor';
import { EditorState, Modifier, RichUtils } from 'draft-js';

const toggleColor = (
  { editorState, setEditorState }: EditorCoreHandlerProps,
  toggledColor: string
) => {
  const selection = editorState.getSelection();

  // Let's just allow one color at a time. Turn off all active colors.
  const nextContentState = Object.keys(colorStyleMap).reduce(
    (contentState, color) => {
      return Modifier.removeInlineStyle(contentState, selection, color);
    },
    editorState.getCurrentContent()
  );

  let nextEditorState = EditorState.push(
    editorState,
    nextContentState,
    'change-inline-style'
  );

  const currentStyle = editorState.getCurrentInlineStyle();

  // Unset style override for current color.
  if (selection.isCollapsed()) {
    nextEditorState = currentStyle.reduce((editorState, color) => {
      return RichUtils.toggleInlineStyle(
        editorState as EditorState,
        color as string
      );
    }, nextEditorState);
  }

  // If the color is being toggled on, apply it.
  if (!currentStyle.has(toggledColor)) {
    nextEditorState = RichUtils.toggleInlineStyle(
      nextEditorState,
      toggledColor
    );
  }

  setEditorState(nextEditorState);
};

export default toggleColor;
