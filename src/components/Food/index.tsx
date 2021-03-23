import React from 'react';
import { Container } from './style'

interface Props{
  dot: number[]
}
const Food = (props: Props) => {
  const pos = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`
  }

  return (
    <Container pos={pos}/>
  )
}

export default Food