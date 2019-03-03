import React from 'react'

const Memo = props => {
  const {memo, checked, handleChecked, handleDelete} = props

  return (
    <li>
      <div>
        <input type='checkbox' checked={checked} onChange={handleChecked}/>
        { memo.front }
        <button onClick={handleDelete}>&times;</button>
      </div>
    </li>
  )
}

export default Memo
