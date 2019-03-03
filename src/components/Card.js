import React from 'react';
import styled from 'styled-components';

const Front = styled.div`
  text-align: center;
  font-size: ${props => props.primary ? '1.5em' : '1.3em'};
  color: ${props => props.primary ? '#000' : '#a2a2a2'}
`

const Card = props => {
  const { front, back, desc, className } = props
  return (
    <div className={className}>
      <Front primary>{ front }</Front>
      <Front>{ front }</Front>
    </div>
  )
}

const colors = ['#88CCFF', '#79C5E8', '#8EE9FF', '#76DFE8', '#82FFF9', '#76DFE8' , '#8EE9FF']

//#89D4E8
export default styled(Card)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 200px;
  border-top: 4px solid ${props => colors[props.number] || colors[0]};
  border-radius: 0 0 5px 5px;
  box-shadow: 7px 7px 30px -4px rgba(0,0,0,0.62);
`
