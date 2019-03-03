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
// 1
//   grid-template-columns: 1fr;
//   padding: 0 600px;

// 2
// grid-template-columns: 1fr 1fr;
// padding: 0 400px;

// 3
// grid-template-columns: 1fr 1fr 1fr;
// padding: 0 250px;

// 4
// grid-template-columns: 1fr 1fr;
// padding: 0 400px;

// 5, 6
// grid-template-columns: 1fr 1fr 1fr;
// padding: 0 250px;

// 7
// grid-template-columns: 1fr 1fr 1fr 1fr;
// padding: 0 80px;

//   grid-template-columns: 1fr 1fr 1fr
const CardBoard = styled.div`
  display: grid;
  grid-column-gap: 100px;
  grid-row-gap: 35px;
  grid-auto-rows: repeat(2, minmax(200px, auto));
  padding: 0 80px;
  grid-row-gap: 35px;
`

const gridsColumn = [
  ['1 / 3'],
  ['1 / 3', '3 / 5'],
  ['1 / 3', '3 / 5', '5 / 7'],
  ['1 / 3', '3 / 5', '1 / 3', '3 / 5'],
  ['1 / 3', '3 / 5', '5 / 7', '2 / 4', '4 / 6'],
  ['1 / 3', '3 / 5', '5 / 7', '1 / 3', '3 / 5', '5 / 7'],
  ['1 / 3', '3 / 5', '5 / 7', '7 / 9', '2 / 4', '4 / 6', '6 / 8']
];

const App = ({ dbSettings, tableSettings }) => {
  const [ state, crud ] = useWebSQL(dbSettings, tableSettings)
  const [ cardsIds, setCardsIds ] = useLocalStorageState('memo-tab:selectedCards',[])

  const handleDelete = id => {
    crud.delete(id)
    setCardsIds(cardsIds.filter(_id => _id !== id))
  }

  const gridColumn = gridsColumn[cardsIds.length - 1];

  return (
    <Wrapper>
      <NewCardForm onAdd={(payload, data) => crud.create(payload, data)}/>
      <CardBoard>
        { state.memos.filter(({ id }) => cardsIds.includes(id)).map((card, index) => <Card key={card.id} number={index} {...card} gridColumn={gridColumn[index]}/>) }
      </CardBoard>
      <MemoList memos={state.memos} cardsIds={cardsIds} setCardsIds={setCardsIds} handleDelete={handleDelete}/>
    </Wrapper>
  )
}

export default App;
