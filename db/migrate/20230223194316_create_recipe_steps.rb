class CreateRecipeSteps < ActiveRecord::Migration[6.1]
  def change
    create_table :recipe_steps do |t|
      t.integer :value
      t.string :instruction
      t.integer :recipe_id

      t.timestamps
    end
  end
end
