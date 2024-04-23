import { COLOR_TYPES } from '../const/richTextEditor';
import { GroupButtonProps } from '@repo/types/richTextEditor';
import StyleDropdown from './StyleDropdown';

const ColorControls = ({ editorState, onToggle }: GroupButtonProps) => {
  let currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls --no-border">
      <StyleDropdown
        types={COLOR_TYPES}
        onToggle={onToggle}
        value={
          COLOR_TYPES.find((type) => {
            return currentStyle.has(type.style);
          })?.style || 'black'
        }
      />
    </div>
  );
};

export default ColorControls;
