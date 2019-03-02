import React from 'react'
import styled from 'styled-components'
import { useWebSQL } from './hooks'
import Card from './components/Card'


const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`

const App = ({ dbSettings, tableSettings }) => {
  const [ state, dispatch ] = useWebSQL(dbSettings, tableSettings)
  return (
    <Wrapper>
      {
        state.cards.map(card => <Card key={card.id} {...card}/>)
      }
    </Wrapper>
  )
}

export default App;
