import React from 'react'
import styled from 'styled-components'
import { useWebSQL, useLocalStorageState } from './hooks'
import Card from './components/Card'
import NewCardForm from './components/NewCardForm'
import MemoList from './components/MemoList'


const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
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
      {
        state.memos.filter(({ id }) => cardsIds.includes(id)).map(card => <Card key={card.id} {...card}/>)
      }
      <MemoList memos={state.memos} cardsIds={cardsIds} setCardsIds={setCardsIds} handleDelete={handleDelete}/>
    </Wrapper>
  )
}

export default App;
