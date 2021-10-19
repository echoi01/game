// import logo from './logo.svg';
import './App.css';
import Canvas from './Canvas';

function App() {
  // general
  const FPS       = 60;
  // const STEP      = 5; 
  const UP_KEY    = 38; // ^ arrow
  const DOWN_KEY  = 40; // v arrow
  const LEFT_KEY  = 37; // < arrow
  const RIGHT_KEY = 39; // > arrow
  const SPACE     = 32; // space

    // const keydownFx = (event) => {
  //   switch(event.keyCode) {
  //     case 32:
  //       sl.push({ x: px, y:py});
  //       break;
  //     case 37:
  //       px -= ps;
  //       break;
  //     case 38:
  //       py -= ps;
  //       break;
  //     case 39:
  //       px += ps;
  //       break;
  //     case 40:
  //       py += ps;
  //       break;
  //     default:
  //       break;
  //   }
  // } 

  const pressedKeys = [];
  let movingTimeout = null;
  let shootingTimeout = null;

  // player
  let px = 100;
  let py = 100;
  let pd = 30;
  let ps = 15;
  // let playerDirection = '';
  // const shotTypes = ['standard', '']
  // const shotType = 'standard';
  const shotColor = 'cyan';

  // enemy
  let el = [];
  const ed = 24
  const es = 5;
  
  // shots
  let sl = [];
  const sd = 10;
  const ss = 20;

  const move = (x, y) => {
    // Implement you own logic here for positioning / handling collisions
    // Ex: store.dispatch({ type: "MOVE_PLAYER", x, y });
    console.log(`Moving ${x} ${y} !`);
    px += x;
    py +=y;
  }
  

  const loop = () => {
    const x = pressedKeys[RIGHT_KEY] ? ps
            : pressedKeys[LEFT_KEY] ? -ps : 0;
    const y = pressedKeys[DOWN_KEY] ? ps
            : pressedKeys[UP_KEY] ? -ps : 0;
    move(x, y);
    movingTimeout = setTimeout(loop, 1000 / FPS);
  }
  
  const startMoving = (e) => {
    if(!movingTimeout){
      loop();
    }
  }
  
  const stopMoving = () => {
    clearTimeout(movingTimeout);
    movingTimeout = null;
  }

  const shoot = () => {
    sl.push({ x: px, y: py })
  }

  const stopShooting = () => {
    clearTimeout(shootingTimeout);
    shootingTimeout = null;
  }

  const handleKeyDown = (e) => {
    // debugger;
    pressedKeys[e.keyCode] = true;
    switch(e.keyCode) {
      case DOWN_KEY:
      case LEFT_KEY:
      case RIGHT_KEY:
      case UP_KEY:
        e.preventDefault();
        startMoving();
        break;
      case SPACE:
        e.preventDefault();
        shoot();
        break;
      default:
        break;
    }
  }

  const handleKeyUp = (e) => {
    pressedKeys[e.keyCode] = false;
    const shouldStopMoving = !pressedKeys[UP_KEY]
      && !pressedKeys[DOWN_KEY]
      && !pressedKeys[LEFT_KEY]
      && !pressedKeys[RIGHT_KEY]
    ;

    const shouldStopShooting = e.keyCode === SPACE;
    if(shouldStopMoving) {
      stopMoving();
    }
    if (shouldStopShooting) {
      stopShooting();
    }
  }

  const init = (ctx) => {
    document.addEventListener('keydown', e => handleKeyDown(e));
    document.addEventListener('keyup', e => handleKeyUp(e));
  }

  // const draw = (ctx, frameCount) => {
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    // ctx.fillStyle = '#000000'
    // ctx.beginPath()
    // ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    // ctx.fill()
  // };

  const spawn = (ctx) => {
    el.push({ x: ctx.canvas.width, y: Math.random() * ctx.canvas.height });
  };

  const update = (ctx) => {
    ctx.fillStyle="black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle="white";
    ctx.fillRect(px-pd/2,py-pd/2,pd,pd);
    
    ctx.fillStyle=shotColor;
    for(let i = 0; i < sl.length; i++) {
      sl[i].x += ss;
      ctx.fillRect(sl[i].x - sd/2, sl[i].y - sd/2, sd, sd);

      for (let j = el.length - 1; j > 0; j--) {
        const dx = Math.abs(el[j].x - sl[i].x);
        const dy = Math.abs(el[j].y - sl[i].y);
        const dist = Math.sqrt(dx*dx+dy*dy);
        if (dist < (sd + ed)/2) {
          el.splice(j, 1);
        }
      }
    };

    ctx.fillStyle="red";
    for(let i = 0; i < el.length; i++) {
      el[i].x -= es;
      ctx.fillRect(el[i].x - ed/2, el[i].y - ed/2, ed, ed);

      const dx = Math.abs(el[i].x - px);
      const dy = Math.abs(el[i].y - py);
      const dist = Math.sqrt(dx*dx+dy*dy);
      if (dist < (pd + ed)/2) {
        sl = [];
        el = [];
        px=py = 100;
        break;
      }
    }
  }

  return (
    <div className="App" style={{height: '100vh'}}>
      {/* <header className="App-header">
        <h2> Game </h2>
      </header> */}
      <Canvas update={update} init={init} spawn={spawn} />
        
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p> Edit <code>src/App.js</code> and save to reload.</p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a> */}
    </div>
  );
}

export default App;
