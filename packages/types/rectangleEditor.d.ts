import exp from 'constants';
import type { Rect, Text } from 'fabric/fabric-impl';

export interface RectEditorProps {
  imagePath: string;
  data: RectData[];
  onSave: (data: RectData[]) => void;
  onCancel: () => void;
}

export interface RectData {
  id?: string | number;
  class: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CustomRect extends Rect {
  id?: string | number;
}

export interface CustomText extends Text {
  id?: string | number;
}
