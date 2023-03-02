class RecipeCommentsController < ApplicationController

    def create
        user = User.find(session[:user_id])
        recipe = Recipe.find(params[:recipe_id])
        comment = recipe.recipe_comments.create!(comment: params[:comment], user_id: user.id)
        render json: recipe
    end
end
