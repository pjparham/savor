import React, { useState } from 'react'
import Comment from './Comment'
import { useDispatch } from "react-redux"
import { recipeUpdated } from '../features/recipes/recipesSlice'

export default function Comments({ recipe, user }) {
    const dispatch = useDispatch()
    const [comment, setComment] = useState("")
    const [errors, setErrors] = useState([])

    function onSubmit(e){
        e.preventDefault()
        let newComment = {
            "recipe_id": recipe.id,
            "comment": comment
        }
        fetch('/recipe_comments', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newComment)
        })
        .then(r => {
            if(r.ok){
                r.json()
                .then((updatedRecipe) => dispatch(recipeUpdated(updatedRecipe)))
                setComment("")
            }
            else {r.json().then(e => setErrors(e.errors))}
        })
    }

    function handleDelete(deletedComment){
        fetch(`/recipe_comments/${deletedComment.id}`, {
            method: "DELETE",
        })
        .then((r) => {
            if(r.ok){
                r.json()
                .then((updatedRecipe) => dispatch(recipeUpdated(updatedRecipe)))
            }
            else{
                alert('Database connection unstable, unable to process action')
            }
        })
    }

    const displayComments = recipe && recipe.recipe_comments.map((c) => {
        return <Comment handleDelete={handleDelete} comment={c} user={user} key={c.id}/>
    })

  return (
    <div className="comments-container">
        <h1 className="comments-title">Comments</h1>
        {displayComments}
        <h1>Write a comment:</h1>
        {errors.length > 0 ? <div className='errors-container'>{errors}</div> : null}
        <form onSubmit={onSubmit}>
            <textarea value={comment} onChange={e => setComment(e.target.value)} className="comment-input" type="textarea" id="review" name="review"></textarea><br></br>
            <div onClick={onSubmit} className='comment-submit-button'>Submit</div>
        </form>

    </div>
  )
}
