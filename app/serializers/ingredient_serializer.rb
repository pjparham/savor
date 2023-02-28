class IngredientSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :name, :unit
end
