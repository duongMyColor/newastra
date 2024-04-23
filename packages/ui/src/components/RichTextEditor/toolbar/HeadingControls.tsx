import { HEADING_TYPES } from '../const/richTextEditor';
import { GroupButtonProps } from '@repo/types/richTextEditor';
import StyleDropdown from './StyleDropdown';

const HeadingControls = ({ editorState, onToggle }: GroupButtonProps) => {
  const startKey = editorState.getSelection().getStartKey();

  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(startKey)
    .getType();

  return (
    <div className="RichEditor-controls --no-border">
      <StyleDropdown
        types={HEADING_TYPES}
        onToggle={onToggle}
        value={blockType}
      />
    </div>
  );
};

export default HeadingControls;
