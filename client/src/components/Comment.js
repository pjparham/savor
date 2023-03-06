import React from 'react'

export default function Comment({ comment, user, handleDelete }) {
    const isCurrentUser = comment.user.id === user.id

    function onDelete(){
      handleDelete(comment)
    }

  return (
    <div className='comment-container'>
        <div className='comment-username'>{comment.user.username}</div>
        <div className='comment-text'>{comment.comment}</div>
        {isCurrentUser ? <div onClick={onDelete} className='comment-delete'>DELETE</div> : null}
    </div>
  )
}
