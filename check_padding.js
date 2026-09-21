const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function checkPadding() {
  const image = await loadImage('25.png');
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
  
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const alpha = data[(y * canvas.width + x) * 4 + 3];
      if (alpha > 0) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  
  console.log(`Image size: ${canvas.width}x${canvas.height}`);
  console.log(`Bounding box: x=${minX}, y=${minY}, w=${maxX - minX + 1}, h=${maxY - minY + 1}`);
  console.log(`Left padding: ${minX}`);
}

checkPadding().catch(console.error);