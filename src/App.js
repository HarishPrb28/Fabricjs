import "./App.css";
import Canvas from "./component/Canvas";
// import CanvasComponent from "./component/CanvasComponent";

function App() {
  return (
    <div className="App">
      <h1>Fabric.js Drawing App</h1>
      <div className="canvas-container">
        <Canvas />
        {/* <CanvasComponent /> */}
      </div>
    </div>
  );
}

export default App;
