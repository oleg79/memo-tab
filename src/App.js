import React from 'react'
import styled from 'styled-components'
import { useWebSQL, useLocalStorageState } from './hooks'
import Card from './components/Card'
import NewCardForm from './components/NewCardForm'
import MemoList from './components/MemoList'


const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

const CardBoard = styled.div`
  display: grid;
  grid-column-gap: 100px;
  grid-row-gap: 35px;
  grid-auto-rows: minmax(200px, auto);
  grid-template-columns: 1fr 1fr 1fr
  grid-template-rows: 200px 200px;
  justify-content: space-around;
  align-items: center;
  align-content: space-evenly;
  padding: 0 100px;
`

const App = ({ dbSettings, tableSettings }) => {
  const [ state, crud ] = useWebSQL(dbSettings, tableSettings)
  const [ cardsIds, setCardsIds ] = useLocalStorageState('memo-tab:selectedCards',[])

  const handleDelete = id => {
    crud.delete(id)
    setCardsIds(cardsIds.filter(_id => _id !== id))
  }

  return (
    <Wrapper>
      <NewCardForm onAdd={(payload, data) => crud.create(payload, data)}/>
      <CardBoard>
        { state.memos.filter(({ id }) => cardsIds.includes(id)).map((card, index) => <Card key={card.id} number={index} {...card}/>) }
      </CardBoard>
      <MemoList memos={state.memos} cardsIds={cardsIds} setCardsIds={setCardsIds} handleDelete={handleDelete}/>
    </Wrapper>
  )
}

export default App;
