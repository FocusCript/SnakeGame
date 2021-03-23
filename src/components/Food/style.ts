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
  background: red;
  border: 1px solid #fff;
  border-radius: 50%;
  left: ${({pos}: Props) => pos.left};
  top: ${({pos}: Props) => pos.top};
  z-index: 1;
`