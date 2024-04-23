import { INLINE_STYLES } from '../const/richTextEditor';
import StyleButton from './StyleButton';
import { GroupButtonProps } from '@repo/types/richTextEditor';

const InlineStyleControls = ({ editorState, onToggle }: GroupButtonProps) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
          icon={type.icon}
        />
      ))}
    </div>
  );
};

export default InlineStyleControls;
