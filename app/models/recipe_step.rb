class RecipeStep < ApplicationRecord
    belongs_to :recipe

    validates :instruction, presence: true
end
