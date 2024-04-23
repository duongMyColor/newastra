import { FONT_SIZE_TYPES } from '../const/richTextEditor';
import { GroupButtonProps } from '@repo/types/richTextEditor';
import StyleDropdown from './StyleDropdown';

const ColorControls = ({ editorState, onToggle }: GroupButtonProps) => {
  let currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls --no-border">
      <StyleDropdown
        types={FONT_SIZE_TYPES}
        onToggle={onToggle}
        value={
          FONT_SIZE_TYPES.find((type) => {
            return currentStyle.has(type.style);
          })?.style || 'fs16'
        }
      />
    </div>
  );
};

export default ColorControls;
