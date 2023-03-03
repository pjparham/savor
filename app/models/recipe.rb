class Recipe < ApplicationRecord
    belongs_to :user
    has_many :recipe_comments, :dependent => :destroy
    has_many :commented_users, :through => :recipe_comments, :source => :user
    has_many :ingredients, :dependent => :destroy
    has_many :recipe_steps, :dependent => :destroy
    has_many :favorites, :dependent => :destroy
    has_many :favorited_users, :through => :favorites, :source => :user
    accepts_nested_attributes_for :ingredients
    accepts_nested_attributes_for :recipe_steps
    has_one_attached :image, :dependent => :destroy
end
