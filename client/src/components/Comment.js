import React from 'react'

export default function Comment({ comment, user }) {
    const isCurrentUser = comment.user.id === user.id

  return (
    <div className='comment-container'>
        <div className='comment-username'>{comment.user.username}</div>
        <div className='comment-text'>{comment.comment}</div>
    </div>
  )
}
