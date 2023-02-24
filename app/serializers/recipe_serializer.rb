class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :category
  belongs_to :user
  has_many :ingredients
  has_many :recipe_steps
end
