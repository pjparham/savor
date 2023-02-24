class RecipeStepSerializer < ActiveModel::Serializer
  attributes :id, :value, :instruction
end
