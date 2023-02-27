class Recipe < ApplicationRecord
    belongs_to :user
    has_many :recipe_comments
    has_many :commented_users, :through => :recipe_comments, :source => :user
    has_many :ingredients
    has_many :recipe_steps
    has_many :favorites
    has_many :favorited_users, :through => :favorites, :source => :user
    accepts_nested_attributes_for :ingredients
    accepts_nested_attributes_for :recipe_steps
end
