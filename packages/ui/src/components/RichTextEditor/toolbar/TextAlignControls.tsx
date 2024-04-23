import { TEXT_ALIGN_TYPES } from '../const/richTextEditor';
import checkTextAligned from '../utils/checkTextAligned';
import StyleButton from './StyleButton';
import { GroupButtonProps } from '@repo/types/richTextEditor';

const TextAlignControls = ({ editorState, onToggle }: GroupButtonProps) => {
  return (
    <div className="RichEditor-controls">
      {TEXT_ALIGN_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={checkTextAligned(editorState, type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
          icon={type.icon}
        />
      ))}
    </div>
  );
};

export default TextAlignControls;
