import React from 'react';
import styled from 'styled-components';

const Card = props => {
  const { front, back, desc, className } = props
  return <div className={className}>{ front }</div>
}
    

export default styled(Card)`
  font-size: 1.5em;
  float: left
  width: 300px;
  height: 200px;
  border-top: 5px solid #89D4E8;
  border-radius: 0 0 5px 5px;
  margin: 35px;
  text-align: center;
  box-shadow: 7px 7px 30px -4px rgba(0,0,0,0.62);
`
