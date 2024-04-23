import { LIST_TYPES } from '../const/richTextEditor';
import StyleButton from './StyleButton';
import { GroupButtonProps } from '@repo/types/richTextEditor';

const HeadingControls = ({ editorState, onToggle }: GroupButtonProps) => {
  const startKey = editorState.getSelection().getStartKey();

  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(startKey)
    .getType();

  return (
    <div className="RichEditor-controls">
      {LIST_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
          icon={type.icon}
        />
      ))}
    </div>
  );
};

export default HeadingControls;
