import React from 'react';
import { Container } from './style'

interface Props{
  snakeDots: number[][]
}

const Snake = (props: Props) => {
  return (
    <div>
      {props.snakeDots.map((dot: number[], i: number) => {
        const pos = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`
        }
        return (
          <Container key={i} pos={pos}/>
        )
      })}
    </div>
  )
}

export default Snake