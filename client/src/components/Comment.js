import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { recipeUpdated } from '../features/recipes/recipesSlice'
export default function Comment({ comment, user, handleDelete }) {
    const dispatch = useDispatch()
    const [editing, setEditing] = useState(false)
    const [body, setBody] = useState(comment.comment)
    const isCurrentUser = comment.user.id === user.id

    function onDelete(){
      handleDelete(comment)
    }



    function handleUpdate(e){
      e.preventDefault()
      let updatedComment = {
        "comment": body,
        "recipe_id": comment.recipe_id,
      }
      fetch(`/recipe_comments/${comment.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedComment)
      })
      .then((r) => r.json())
      .then((updatedRecipe) => {
        dispatch(recipeUpdated(updatedRecipe))
        setEditing(false)
      })
    }
    
    if(editing){
      return (
        <div className='comment-container'>
          <div className='comment-username'>{comment.user.username}</div>
          <div onClick={() => setEditing(false)} className="review-delete"><i className="fa-solid fa-x"></i></div>
          <form>
            <textarea value={body} onChange={e => setBody(e.target.value)}/>
          </form>
          <div onClick={handleUpdate}><i className="fa-regular fa-paper-plane"></i></div>
        </div>
      )
    }
  

  return (
    <div className='comment-container'>
        <div className='comment-username'>{comment.user.username}</div>
        <div className='comment-text'>{comment.comment}</div>
        {isCurrentUser ? 
          <>
            <div onClick={onDelete} className='comment-delete'>Delete</div>
            <div onClick={() => setEditing(true)} className="review-delete"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
          </> : null}
    </div>
  )
}
