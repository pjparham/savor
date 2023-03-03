require 'byebug'
class RecipesController < ApplicationController
    before_action :set_recipe, only: [:show, :update, :destroy]
    skip_before_action :authorized, only: :index

    def index
        render json: Recipe.all.with_attached_image
    end

    def show
        render json: @recipe
    end

    def create
        byebug
        user = User.find(session[:user_id])
        recipe = user.recipes.create!(recipe_params)
        render json: recipe
    end

    def update
        user = User.find(session[:user_id])
        recipe = user.recipes.find_by(id: params[:id])
        recipe.update(recipe_params)
        render json: recipe
    end

    def destroy
        user = User.find(session[:user_id])
        recipe = user.recipes.find_by(id: params[:id])
        recipe.destroy
        head :no_content
    end

    private

    def recipe_params
        params.permit(:name, :category, :image,
             { ingredients_attributes: [:name, :quantity, :unit] },
             recipe_steps_attributes: [:value, :instruction]
            )
    end

    def set_recipe
        @recipe = Recipe.find(params[:id])
    end
end

