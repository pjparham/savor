class Recipe < ApplicationRecord
    belongs_to :user
    has_many :recipe_comments
    has_many :commented_users, :through => :recipe_comments, :source => :user
    has_many :list_recipes
    has_many :lists, :through => :list_recipes
    has_many :ingredients
    has_many :recipe_steps
end
