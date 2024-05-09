import sharp from 'sharp';

// RGBのレンジを定義
enum ColorRange {
  Low = 0,
  Middle = 1,
  High = 2,
}

const RANGE_DIVISOR = 85; // RGBを3つに分ける際の除数
const COLOR_BINS = 27; // カラービンの数（BGRそれぞれにつき3パート）

// RGBカラー値をレンジに分類
const getColorRange = (value: number): ColorRange => {
  if (value < RANGE_DIVISOR) return ColorRange.Low;
  if (value < RANGE_DIVISOR * 2) return ColorRange.Middle;
  return ColorRange.High;
};

// BGRインデックスを取得
const getBGRIndex = (b: number, g: number, r: number): number =>
  getColorRange(b) * 9 + getColorRange(g) * 3 + getColorRange(r);

// 指定されたエリアから色の配分を抽出
const extractColorDistribution = async (
  imagePath: string,
  startXPercent: number,
  startYPercent: number,
  areaWidthPercent: number,
  areaHeightPercent: number
): Promise<number[]> => {
  const image = sharp(imagePath);
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height)
    throw new Error('Image metadata is missing.');

  const imgWidth = metadata.width;
  const imgHeight = metadata.height;

  const startX = Math.round(imgWidth * startXPercent);
  const startY = Math.round(
    imgHeight * (1 - startYPercent - areaHeightPercent)
  );
  const areaWidth = Math.round(imgWidth * areaWidthPercent);
  const areaHeight = Math.round(imgHeight * areaHeightPercent);

  const result = await image
    .extract({
      left: startX,
      top: startY,
      width: areaWidth,
      height: areaHeight,
    })
    .toColourspace('bgr')
    .raw()
    .toBuffer();

  const data = result?.data;

  const initialColorCounts: number[] = new Array(COLOR_BINS).fill(0);

  const colorCounts: number[] = data.reduce(
    (counts: number[], value: any, index: number) => {
      if (index % 3 === 0) {
        const bgrIndex = getBGRIndex(
          data[index],
          data[index + 1],
          data[index + 2]
        );
        if (counts[bgrIndex] !== undefined) {
          counts[bgrIndex]++;
        }
      }
      return counts;
    },
    initialColorCounts
  );

  const totalPixels = areaWidth * areaHeight;
  // 小数点第４位で四捨五入し、3桁の精度を保つ
  return colorCounts.map(
    (count: number) => Math.round((count / totalPixels) * 1000) / 1000
  );
};

export default extractColorDistribution;
