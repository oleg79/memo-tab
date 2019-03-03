import React, { useState } from 'react'
import styled from 'styled-components'
import { useWebSQL, useLocalStorageState } from './hooks'
import Card from './components/Card'
import Menu from './components/Menu'


const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 100px);
  position: relative;
`

const Blur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`

const Header = styled.div`
  height: 100px;
  position: relative;
  text-align: center;
  background: #E0F7FF;
  color: #769aa0;
  font-weight: bold;
  font-size: 3em;
  border-bottom: 4px solid #769aa0;
  line-height: 2em;
  margin-bottom: 100px;
`

const CardBoard = styled.div`
  display: grid;
  grid-column-gap: 50px;
  grid-row-gap: 50px;
  grid-auto-rows: repeat(2, minmax(200px, auto));
  padding: 0 80px;
  filter: blur(${props => props.blur ? 5 : 0}px);
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
  const [ clickedIndex, setClickedIndex ] = useState(-1)
  const [ isMenuOpen, setMenuOpen ] = useState(true)

  const handleDelete = id => {
    crud.delete(id)
    setCardsIds(cardsIds.filter(_id => _id !== id))
  }

  const handleMenuOpen = () => setMenuOpen(true)
  const handleMenuClose = () => setMenuOpen(false)

  const gridColumn = gridsColumn[cardsIds.length - 1];

  return (
    <Wrapper>
      <Header>
        MEMO TAB
      </Header>
      <Blur/>
      <Menu
        memos={state.memos}
        cardsIds={cardsIds}
        setCardsIds={setCardsIds}
        handleDelete={handleDelete}
        onAdd={(payload, data) => crud.create(payload, data)}
        open={handleMenuOpen}
        close={handleMenuClose}
        isOpen={isMenuOpen}
      />
      <CardBoard blur={isMenuOpen}>
        { state.memos
          .filter(({ id }) => cardsIds.includes(id))
          .map((card, index) => 
            <Card
              key={card.id}
              number={index}
              gridColumn={gridColumn[index]}
              clicked={clickedIndex === index}
              onClick={() => setClickedIndex(clickedIndex === index ? -1 : index)}
              {...card}
            />
          ) }
      </CardBoard>
    </Wrapper>
  )
}

export default App;
