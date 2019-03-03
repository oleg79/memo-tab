import React from 'react'
import Memo from './Memo'

const MemoList = props => {
  const { memos, cardsIds, setCardsIds, handleDelete } = props

  const handleChecked = id => {
    if (cardsIds.includes(id)) {
      setCardsIds(cardsIds.filter(_id => _id !== id))
    } else {
      if (cardsIds.length < 7) {
        setCardsIds([...cardsIds, id])
      }
    }
  }

  return (
    <ul>
      {memos.map(memo =>
          <Memo
            key={memo.id}
            memo={memo}
            checked={cardsIds.includes(memo.id)}
            handleChecked={() => handleChecked(memo.id)}
            handleDelete={() => handleDelete(memo.id)}
          />
        )}
    </ul>
  )
}

export default MemoList
