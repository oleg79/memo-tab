import React from 'react'
import styled from 'styled-components'
import NewCardForm from './NewCardForm'
import MemoList from './MemoList'
import { Tabs, Tab } from './Tabs'

const OpenedMenu = styled.div`
  position: absolute;
  width: 500px;
  height: 100vh;
  top: 0;
  right: 0;
  background: #FF9C9B;
  z-index: 1;
`

const Header = styled.div`
  height: 100px;
  border-bottom: 4px solid #B24A49;
  color: #B24A49;
  font-size: 3em;
  line-height: 2em;
  text-align: center;
  font-weight: bold;
` 

const MenuToggler = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  top: 20px;
  right: 20px;
  border: 2px solid #000;
  box-sizing: border-box;
  cursor: pointer;
`

const Menu = props => {
  const { onAdd, isOpen, open, close, className, ...memoListProps } = props
  return isOpen ? (
    <OpenedMenu>
      <Header>
        MENU <span onClick={close}>&times;</span>
      </Header>
      <Tabs initiaTab='newMemo'>
        {(visibleTab, setVisibleTab) => (
          <>
            <Tab name='newMemo' visible={visibleTab === 'newMemo'} setVisibleTab={setVisibleTab}>
              <NewCardForm onAdd={onAdd}/>
            </Tab>
            <Tab name='memoList' visible={visibleTab === 'memoList'} setVisibleTab={setVisibleTab}>
              <MemoList {...memoListProps}/>
            </Tab>
          </>
        )}
      </Tabs>
    </OpenedMenu>
  ) : (
    <MenuToggler onClick={open}/>
  )
}

export default Menu
