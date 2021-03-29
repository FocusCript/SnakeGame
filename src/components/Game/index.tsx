import React, { useCallback, useEffect, useState } from 'react';
import Snake from '../Snake';
import Food from '../Food';
import { Container as GameArea } from '../Game-Area/style';
import { useInterval } from '../hooks/useInterval'

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

const initialState = {
  food: getRandomCoordinates(),
  speed: 50,
  direction: 'RIGHT',
  snakeDots: [
    [0,0],
    [2,0]
  ]
}

const GameZone = ()=>{
  const [food, setFood] = useState(initialState.food);
  const [speed, setSpeed] = useState(initialState.speed);
  const [direction, setDirection] = useState(initialState.direction);
  const [snakeDots, setSnakeDots] = useState(initialState.snakeDots);

  useInterval(moveSnake, speed);

  const enlargeSnake = useCallback(()=>{
    let newSnake = [...snakeDots];
    newSnake.unshift([])
    setSnakeDots(newSnake)
  },[snakeDots])

  const increaseSpeed = useCallback(()=>{
    if (speed > 10) {
      setSpeed(speed - 10)
    }
  },[speed])
  
  const onGameOver = useCallback(()=>{
    alert(`Game Over. Snake length is ${snakeDots.length}`);
    setFood(initialState.food)
    setSnakeDots(initialState.snakeDots)
    setSpeed(initialState.speed)
    setDirection(initialState.direction)
  },[snakeDots])

  const checkIfOutOfBorders = useCallback(()=>{
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver()
    }
  },[snakeDots, onGameOver])

  const checkIfCollapsed = useCallback(()=>{
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop()
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        onGameOver();
      }
    })
  },[snakeDots, onGameOver])
  
  const checkIfEat = useCallback(()=>{
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood(getRandomCoordinates())
      enlargeSnake();
      increaseSpeed();
    }
  },[snakeDots, food, enlargeSnake, increaseSpeed])
  
  useEffect(()=>{
    checkIfOutOfBorders();
    checkIfCollapsed();
    checkIfEat();
  },[snakeDots, checkIfOutOfBorders, checkIfCollapsed, checkIfEat])

  useEffect(()=>{
    document.onkeydown = onKeyDown;
  },[])

  function onKeyDown (e: any){
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        setDirection((prev)=>prev === 'DOWN' ? 'DOWN' : 'UP')
        break;
      case 40:
        setDirection((prev)=>prev === 'UP' ? 'UP' : 'DOWN')
        break;
      case 37:
        setDirection((prev)=>prev === 'RIGHT' ? 'RIGHT' : 'LEFT')
        break;
      case 39:
        setDirection((prev)=>prev === 'LEFT' ? 'LEFT' : 'RIGHT')
        break;
    }
  }

  function moveSnake(){
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }
    dots.push(head);
    dots.shift();
    setSnakeDots(dots)
  }

  return (
    <GameArea>
      <Snake snakeDots={snakeDots}/>
      <Food dot={food}/>
    </GameArea>
  );
}

export default GameZone;
