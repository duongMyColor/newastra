import Jimp from 'jimp';

async function extractColorDistribution(
  imagePath,
  startXPercent,
  startYPercent,
  areaWidthPercent,
  areaHeightPercent
) {
  const image = await Jimp.read(imagePath);
  const { width, height } = image.bitmap;

  const startX = Math.round(width * startXPercent);
  const startY = Math.round(height * startYPercent);
  const areaWidth = Math.round(width * areaWidthPercent);
  const areaHeight = Math.round(height * areaHeightPercent);

  const colorCounts = new Array(27).fill(0);
  const totalPixels = areaWidth * areaHeight;

  image.scan(startX, startY, areaWidth, areaHeight, (x, y, idx) => {
    const red = image.bitmap.data[idx + 0];
    const green = image.bitmap.data[idx + 1];
    const blue = image.bitmap.data[idx + 2];

    const redRange = getColorRange(red);
    const greenRange = getColorRange(green);
    const blueRange = getColorRange(blue);

    const colorIndex = getBGRIndex(blueRange, greenRange, redRange);
    colorCounts[colorIndex]++;
  });

  const colorDistribution = colorCounts.map((count) =>
    parseFloat((count / totalPixels).toFixed(3))
  );
  return colorDistribution;
}

function getColorRange(color) {
  if (color < 85) return 0; // Low
  if (color < 170) return 1; // Middle
  return 2; // High
}

function getBGRIndex(blueRange, greenRange, redRange) {
  return blueRange + greenRange * 3 + redRange * 9;
}
export default extractColorDistribution;
