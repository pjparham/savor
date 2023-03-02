import React, { useState } from 'react'
import Comment from './Comment'
import { useDispatch } from "react-redux"
import { recipeUpdated } from '../features/recipes/recipesSlice'

export default function Comments({ recipe, user }) {
    const dispatch = useDispatch()
    const [comment, setComment] = useState("")
    console.log(recipe.recipe_comments)

    const displayComments = recipe && recipe.recipe_comments.map((c) => {
        return <Comment comment={c} user={user} key={c.id}/>
    })

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
        .then((r) => r.json())
        .then((updatedRecipe) => dispatch(recipeUpdated(updatedRecipe)))
        setComment("")
    }

  return (
    <div className="comments-container">
    <h1 className="comments-title">Comments</h1>
    {displayComments}
    <h1>Write a comment:</h1>
    <form onSubmit={onSubmit}>
        <textarea value={comment} onChange={e => setComment(e.target.value)} className="comment-input" type="textarea" id="review" name="review"></textarea><br></br>
        <div onClick={onSubmit} className='comment-submit-button'>Submit</div>
    </form>
</div>
  )
}
