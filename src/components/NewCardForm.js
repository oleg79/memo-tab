import React, { useState } from 'react'
import styled from 'styled-components'


const NewCardForm = props => {
  const [ front, setFront ] = useState('')
  const [ back, setBack ] = useState('')
  const [ desc, setDesc ] = useState('')

  const handleFrontChange = event => setFront(event.target.value)
  const handleBackChange = event => setBack(event.target.value)
  const handleDescChange = event => setDesc(event.target.value)

  const handleAdd = () => {
    props.onAdd({ front, back, desc }, [ front, back, desc ])
    setFront('')
    setBack('')
    setDesc('')
  }

  return (
    <div>
      <label>
        <p>front:</p>
        <input type='text' value={front} onChange={handleFrontChange}/>
      </label>
      <label>
        <p>back:</p>
        <input type='text' value={back} onChange={handleBackChange}/>
      </label>
      <label>
        <p>description:</p>
        <input type='text' value={desc} onChange={handleDescChange}/>
      </label>
      <button onClick={handleAdd}>ADD</button>
    </div>
  )
}

export default NewCardForm
