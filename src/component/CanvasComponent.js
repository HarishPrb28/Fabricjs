// CanvasComponent.js

import React, { useState, useEffect } from "react";
import { fabric } from "fabric";

const CanvasComponent = () => {
  const [canvas, setCanvas] = useState(null);
  const [drawingMode, setDrawingMode] = useState(false);

  useEffect(() => {
    const newCanvas = new fabric.Canvas("myCanvas", {
      width: 800,
      height: 600,
      backgroundColor: "lightgrey",
    });
    setCanvas(newCanvas);

    fabric.Image.fromURL("/path/to/your/static/image.jpg", (img) => {
      newCanvas.add(img);
    });

    newCanvas.on("object:selected", () => {
      setDrawingMode(false); // Disable drawing mode when an object is selected
    });

    newCanvas.on("selection:cleared", () => {
      setDrawingMode(true); // Enable drawing mode when the selection is cleared
    });
  }, []);

  const addShape = (shape) => {
    if (canvas) {
      let newObject;
      switch (shape) {
        case "rectangle":
          newObject = new fabric.Rect({
            left: 50,
            top: 50,
            width: 50,
            height: 50,
            fill: "red",
            cornerColor: "green",
            cornerSize: 6,
            transparentCorners: false,
            selectable: true, // Enable object selection
            hasControls: true, // Show controls for resizing and rotating
          });
          break;
        case "circle":
          newObject = new fabric.Circle({
            left: 50,
            top: 50,
            radius: 25,
            fill: "blue",
            cornerColor: "green",
            cornerSize: 6,
            transparentCorners: false,
            selectable: true,
            hasControls: true,
          });
          break;
        default:
          break;
      }
      canvas.add(newObject);
    }
  };

  const addText = () => {
    if (canvas) {
      const newText = new fabric.Textbox("Your Text Here", {
        left: 50,
        top: 50,
        width: 150,
        fontSize: 20,
        fill: "black",
        cornerColor: "green",
        cornerSize: 6,
        transparentCorners: false,
        selectable: true,
        hasControls: true,
      });
      canvas.add(newText);
    }
  };

  const handleDrawingMode = () => {
    setDrawingMode(!drawingMode);
    if (!drawingMode) {
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => addShape("rectangle")} disabled={!drawingMode}>
          Add Rectangle
        </button>
        <button onClick={() => addShape("circle")} disabled={!drawingMode}>
          Add Circle
        </button>
        <button onClick={addText} disabled={!drawingMode}>
          Add Text
        </button>
        <button onClick={handleDrawingMode}>Toggle Drawing Mode</button>
      </div>
      <canvas id="myCanvas"></canvas>
    </div>
  );
};

export default CanvasComponent;
