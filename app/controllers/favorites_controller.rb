class FavoritesController < ApplicationController
    def create 
        user = User.find(session[:user_id])
        recipe = Recipe.find(params[:recipe_id])
        favorite = user.favorites.create(recipe_id: recipe.id)
        render json: recipe
    end

    def destroy
        user = User.find(session[:user_id])
        favorite = user.favorites.find(params[:id])
        recipe = favorite.recipe
        favorite.destroy
        render json: recipe
    end

end
