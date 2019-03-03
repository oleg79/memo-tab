import React, { useState } from 'react'
import styled from 'styled-components'

const AddButton = styled.button`
  outline: none;
  border: 4px solid #B24A49;
  color: #B24A49;
  background: #FF9C9B;
  font-weight: bold;
  font-size: 1.2em;
  width: 95%;
  margin: 0 auto;
  grid-column: 1 / 3;
`

const Separator = styled.div`
  padding: 0 15px;  
`

const TextInput = styled.input`
  width: 85%;
  height: 30px;
  border: none;
  font-size: 1em;
`

const Paragraph = styled.p`
  margin: 0
`

const NewCardForm = props => {
  const { className } = props
  const [ front, setFront ] = useState('')
  const [ frontAdd, setFrontAdd ] = useState('')
  const [ back, setBack ] = useState('')
  const [ desc, setDesc ] = useState('')

  const handleFrontChange = event => setFront(event.target.value)
  const handleFrontAddChange = event => setFrontAdd(event.target.value)
  const handleBackChange = event => setBack(event.target.value)
  const handleDescChange = event => setDesc(event.target.value)

  const handleAdd = () => {
    props.onAdd({ front, back, desc }, [ front, back, desc ])
    setFront('')
    setFrontAdd('')
    setBack('')
    setDesc('')
  }

  return (
    <div className={className}>
      <Separator>
        <label>
          <Paragraph>front:</Paragraph>
          <TextInput type='text' value={front} onChange={handleFrontChange}/>
        </label>
        <label>
          <Paragraph>front additional:</Paragraph>
          <TextInput type='text' value={frontAdd} onChange={handleFrontAddChange}/>
        </label>
        <label>
          <Paragraph>back:</Paragraph>
          <TextInput type='text' value={back} onChange={handleBackChange}/>
        </label>
      </Separator>

      <Separator>
        <label>
          <Paragraph>description:</Paragraph>
          <textarea value={desc} onChange={handleDescChange}/>
        </label>
      </Separator>

      <AddButton onClick={handleAdd}>ADD</AddButton>
    </div>
  )
}

export default styled(NewCardForm)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
`
