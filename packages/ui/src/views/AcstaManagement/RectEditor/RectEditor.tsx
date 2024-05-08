// External imports
import { Dispatch, useEffect } from 'react';
import { fabric } from 'fabric';
import type { Image, Canvas, IEvent, IPoint } from 'fabric/fabric-impl';

// Internal imports
import {
  CustomRect,
  RectData,
  RectEditorProps,
} from '@repo/types/rectangleEditor';
import { roundNumberWith5Decimals } from '@repo/utils/number';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  RECT_OPTIONS,
  SIZE_FALLBACK,
  SCALE_FALLBACK,
} from '@repo/consts/imgRectSelection';

import './style.css';

const drawImgWithFabric = (
  canvas: Canvas,
  imagePath: string,
  rectData: RectData,
  onChange: Dispatch<any>
) => {
  if (!imagePath.includes('base64')) return;

  let rect: CustomRect, isDown: boolean, origX: number, origY: number;

  const addRectangle = (pointer: IPoint) => {
    // Remove any existing rectangles
    canvas.getObjects('rect').forEach((obj) => {
      canvas.remove(obj);
    });

    rect = new fabric.Rect({
      left: pointer.x,
      top: pointer.y,
      ...RECT_OPTIONS,
    });

    canvas.add(rect);
  };

  const updateRectangle = (pointer: IPoint) => {
    if (!isDown) return;
    if (origX > pointer.x) {
      rect.set({ left: Math.abs(pointer.x) });
    }
    if (origY > pointer.y) {
      rect.set({ top: Math.abs(pointer.y) });
    }
    rect.set({ width: Math.abs(origX - pointer.x) });
    rect.set({ height: Math.abs(origY - pointer.y) });
    canvas.renderAll();
  };

  const finishDrawingRectangle = () => {
    isDown = false;

    const x =
      ((rect.left ?? SIZE_FALLBACK) + (rect.width ?? SIZE_FALLBACK) / 2) /
      (canvas.width ?? SIZE_FALLBACK);
    const y =
      ((rect.top ?? SIZE_FALLBACK) + (rect.height ?? SIZE_FALLBACK) / 2) /
      (canvas.height ?? SCALE_FALLBACK);
    const width =
      (rect.width ?? SIZE_FALLBACK) / (canvas.width ?? SCALE_FALLBACK);
    const height =
      (rect.height ?? SIZE_FALLBACK) / (canvas.height ?? SCALE_FALLBACK);

    onChange({
      x: roundNumberWith5Decimals(x),
      y: roundNumberWith5Decimals(y),
      width: roundNumberWith5Decimals(width),
      height: roundNumberWith5Decimals(height),
    });
  };

  const handleMouseDown = (o: IEvent) => {
    isDown = true;
    const pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    addRectangle(pointer);
  };

  const handleMouseMove = (o: IEvent) => {
    const pointer = canvas.getPointer(o.e);
    updateRectangle(pointer);
  };

  const handleMouseUp = () => {
    finishDrawingRectangle();
  };

  // Add image to canvas
  fabric.Image.fromURL(imagePath, (img: Image) => {
    let scale = Math.min(
      CANVAS_WIDTH / (img.width ?? SCALE_FALLBACK),
      CANVAS_HEIGHT / (img.height ?? SCALE_FALLBACK)
    );

    // set canvas size to fit scaled image size
    canvas.setWidth((img.width ?? SCALE_FALLBACK) * scale);
    canvas.setHeight((img.height ?? SCALE_FALLBACK) * scale);

    // set image as background
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
      scaleX: scale,
      scaleY: scale,
    });

    // Add existing rectangles to canvas
    if (!rectData) return;
    const left =
      (rectData.x ?? SIZE_FALLBACK) * (canvas.width ?? SIZE_FALLBACK) -
      ((rectData.width ?? SIZE_FALLBACK) * (canvas.width ?? SIZE_FALLBACK)) / 2;
    const top =
      (rectData.y ?? SIZE_FALLBACK) * (canvas.height ?? SIZE_FALLBACK) -
      ((rectData.height ?? SIZE_FALLBACK) * (canvas.height ?? SIZE_FALLBACK)) /
        2;
    const width =
      (rectData.width ?? SIZE_FALLBACK) * (canvas.width ?? SIZE_FALLBACK);
    const height =
      (rectData.height ?? SIZE_FALLBACK) * (canvas.height ?? SIZE_FALLBACK);

    const rect: CustomRect = new fabric.Rect({
      left,
      top,
      width,
      height,
      ...RECT_OPTIONS,
    });

    canvas.add(rect);
  });

  canvas.renderAll();

  // Handle when user start dragging to draw rectangle
  canvas.on('mouse:down', handleMouseDown);

  // Handle while user dragging to draw rectangle
  canvas.on('mouse:move', handleMouseMove);

  // Handle when user finish drawing rectangle by dropping mouse
  canvas.on('mouse:up', handleMouseUp);
};

const RectEditor = ({
  imagePath,
  data: propsData,
  onChange,
}: RectEditorProps) => {
  useEffect(() => {
    const canvas = new fabric.Canvas('canvas');
    drawImgWithFabric(canvas, imagePath, propsData, onChange);
  }, [imagePath]);

  return (
    <div className="flex-container">
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default RectEditor;
