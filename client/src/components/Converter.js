import { useEffect } from "react";
import images from "../data/images";

const Converter = ({ difficulty, categories, onEmitData }) => {
  const loadImage = () => {
    const image = new Image();

    const category = categories[Math.floor(Math.random() * categories.length)];

    const categoryImages = images[category];
    const randomImage =
      categoryImages[Math.floor(Math.random() * categoryImages.length)];

    const imageUrl = process.env.PUBLIC_URL + randomImage; // Store the image URL
    image.src = imageUrl;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;

      const blockSize = image.width / difficulty;
      let bwPixels = [];

      for (let y = 0; y < image.height; y += blockSize) {
        let row = [];
        for (let x = 0; x < image.width; x += blockSize) {
          let total = 0;
          let count = 0;

          for (let i = 0; i < blockSize; i++) {
            for (let j = 0; j < blockSize; j++) {
              const idx =
                (Math.floor(y + i) * image.width + Math.floor(x + j)) * 4;
              const grayscale =
                (pixels[idx] + pixels[idx + 1] + pixels[idx + 2]) / 3;
              const alpha = pixels[idx + 3]; // Get the alpha channel

              // If the pixel is fully transparent, treat it as white
              if (alpha === 0) {
                total += 255;
              } else {
                total += grayscale;
              }

              count++;
            }
          }

          row.push(total / count <= 170 ? 1 : 0);
        }
        bwPixels.push(row);
      }

      // flip the images rows and columns
      bwPixels = bwPixels[0].map((_, colIndex) =>
        bwPixels.map((row) => row[colIndex])
      );

      const trimmedBwPixels = removeWhiteEdges(bwPixels);
      const title = getTitle(imageUrl);
      const winningGrid = calculateWinningGrid(trimmedBwPixels);

      // Emit data to parent component
      onEmitData({
        size: [trimmedBwPixels.length, trimmedBwPixels[0].length],
        title: title,
        imagePath: imageUrl,
        winningGrid: winningGrid,
      });
    };
  };

  useEffect(() => {
    loadImage();
  }, [difficulty]);

  const getTitle = (path) => {
    let imageString = path.split("/");
    imageString = imageString[imageString.length - 1];
    imageString = imageString.split(".")[0];
    imageString = imageString.replace("mlb-", "");
    let parts = imageString.split("-");
    for (let i = 0; i < parts.length - 1; i++) {
      if (isNaN(parts[i]) || isNaN(parts[i + 1])) {
        parts[i] += " ";
      } else {
        parts[i] += "-";
      }
    }
    imageString = parts.join("");
    imageString = imageString
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return imageString;
  };

  const removeWhiteEdges = (bwImage) => {
    // Remove white rows
    while (bwImage.length > 0 && bwImage[0].every((cell) => cell === 0)) {
      bwImage.shift();
    }
    while (
      bwImage.length > 0 &&
      bwImage[bwImage.length - 1].every((cell) => cell === 0)
    ) {
      bwImage.pop();
    }

    // Remove white columns
    while (bwImage.length > 0 && bwImage.every((row) => row[0] === 0)) {
      bwImage.forEach((row) => row.shift());
    }
    while (
      bwImage.length > 0 &&
      bwImage.every((row) => row[row.length - 1] === 0)
    ) {
      bwImage.forEach((row) => row.pop());
    }

    return bwImage;
  };

  const calculateWinningGrid = (bwImage) => {
    return [...bwImage.map((row) => [...row])];
  };

  // This component doesn't render anything visually
  return null;
};

export default Converter;
