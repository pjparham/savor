class AddServingToRecipes < ActiveRecord::Migration[6.1]
  def change
    add_column :recipes, :servings, :integer
  end
end
