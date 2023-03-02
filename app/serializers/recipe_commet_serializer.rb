class RecipeCommetSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :recipe_id, :comment, :user
end
