import styled from 'styled-components'

interface Props{
  pos: {
    left: string,
    top: string
  }
}

export const Container = styled.div`
  position: absolute;
  width: 2%;
  height: 2%;
  background-color: #000;
  border: 1px solid #fff;
  z-index: 2;
  left: ${({pos}: Props) => pos.left};
  top: ${({pos}: Props) => pos.top};
`