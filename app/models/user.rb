class User < ApplicationRecord
    has_secure_password
    has_many :recipes
    has_many :recipe_comments
    has_many :favorites
    has_many :commented_recipes, :through => :recipe_comments, :source => :recipe
    has_many :favorited_recipes, :through => :favorites, :source => :recipe

    validates :username, presence: true, length: { in: 6..20 }, uniqueness: true
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, presence: true, uniqueness: true;

end
