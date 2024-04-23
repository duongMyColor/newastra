import type { DraftEditorCommand, EditorState } from 'draft-js';

export interface StyleButtonProps {
  onToggle: Function;
  style?: string;
  active?: boolean;
  label?: string;
  icon?: string;
}

export interface GroupButtonProps {
  editorState: EditorState;
  onToggle: Function;
}

export interface LinkHandle {
  showURLInput: boolean;
  url: string;
}

export interface EditorCoreHandlerProps {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
}

export interface StyleType {
  label: string;
  style: string;
  icon?: string;
}
