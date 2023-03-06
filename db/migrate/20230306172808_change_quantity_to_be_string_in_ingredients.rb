class ChangeQuantityToBeStringInIngredients < ActiveRecord::Migration[6.1]
  def change
    change_column :ingredients, :quantity, :string
  end
end
