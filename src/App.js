// import logo from './logo.svg';
import './App.css';
import Canvas from './Canvas';

function App() {
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
  };
  const update = (ctx) => {
    ctx.fillStyle="black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle="white";
    ctx.fillRect(px, py, pd, pd);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2> Game </h2>
      </header>
      <Canvas draw={draw} update={update} />
        
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p> Edit <code>src/App.js</code> and save to reload.</p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a> */}
    </div>
  );
}

export default App;
