class IngredientSerializer < ActiveModel::Serializer
  attributes :id, :value, :name, :measurement
end
