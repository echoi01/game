import React, { useRef, useEffect } from 'react'

const Canvas = props => {
  const { init, draw, update, spawn, ...rest } = props
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    canvas.style.width=window.innerWidth * 3;
    canvas.style.height=window.innerHeight * 3;
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId
    
    const render = () => {
      init(context);
      frameCount++
      if (frameCount % 10 === 0) {
        spawn(context);
      }
      update(context);
      animationFrameId = window.requestAnimationFrame(render)
      
    }
    render();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  })
  
  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas