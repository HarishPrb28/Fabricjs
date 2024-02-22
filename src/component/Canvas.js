// Canvas.js
import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 500,
    });

    // Add static image
    fabric.Image.fromURL(
      "https://images.unsplash.com/photo-1682685796965-9814afcbff55?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      (img) => {
        img.set({
          left: canvas.width / 2 - img.width / 2,
          top: canvas.height / 2 - img.height / 2,
          selectable: false, // Make the image non-selectable
          evented: false, // Make the image non-evented (non-interactive)
        });
        canvas.add(img);
      }
    );

    // Other Fabric.js configurations and initializations can be done here
    // Example: Draw a rectangle
    const drawRectangle = () => {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        width: 100,
        height: 50,
        fill: "yellow",
      });
      canvas.add(rect);
    };

    // Example: Draw text
    const drawText = () => {
      const text = new fabric.Textbox("Hello, Fabric!", {
        left: 200,
        top: 200,
        fill: "white",
      });
      canvas.add(text);
    };

    // Add event listener for drawing circle
    const drawCircle = () => {
      const circle = new fabric.Circle({
        left: 200,
        top: 200,
        radius: 30,
        fill: "lightgreen",
        selectable: true,
      });
      canvas.add(circle);
    };
    // Example: Add event listeners to buttons triggering drawing modes
    document
      .getElementById("drawRectangleBtn")
      .addEventListener("click", drawRectangle);
    document.getElementById("drawTextBtn").addEventListener("click", drawText);
    document
      .getElementById("drawCircleBtn")
      .addEventListener("click", drawCircle);

    // ... (other event listeners for additional shapes)

    return () => {
      // Clean up Fabric.js resources when the component is unmounted
      document
        .getElementById("drawRectangleBtn")
        .removeEventListener("click", drawRectangle);
      document
        .getElementById("drawTextBtn")
        .removeEventListener("click", drawText);

      document
        .getElementById("drawCircleBtn")
        .removeEventListener("click", drawCircle);

      canvas.dispose();
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
      <button id="drawRectangleBtn">Draw Rectangle</button>
      <button id="drawTextBtn">Draw Text</button>
      <button id="drawCircleBtn">Draw Circle</button>

      {/* Add more buttons for other shapes */}
    </div>
  );
};

export default Canvas;
