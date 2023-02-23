class User < ApplicationRecord
    has_secure_password
    has_many :recipes
    has_many :lists
    has_many :recipe_comments
    has_many :list_recipes, :through => :lists
    has_many :commented_recipes, :through => :recipe_comments, :source => :recipe
end
