# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.create({username: 'pkparham', password: 'helloworld', first_name: 'Parker', last_name: 'Parham', email: 'parker@email.com'})
user2 = User.create({username: 'janedoe', password: 'helloworld', first_name: 'Jane', last_name: 'Doe', email: 'jane@email.com'})
recipe1 = Recipe.create({user_id: 1, name: 'Carrot Cake', category: 'dessert', servings: 8})
recipe1 = Recipe.create({user_id: 2, name: 'Nachos', category: 'appetizer', servings: 4})
rec2step1 = RecipeStep.create({value: 1, instruction: 'pour cheese over tortilla chips', recipe_id: 2})
rec2step2 = RecipeStep.create({value: 2, instruction: 'pour beef over cheese chips', recipe_id: 2})
rec1step1 = RecipeStep.create({value: 1, instruction: 'sift together dry ingredients', recipe_id: 1})
rec1step2 = RecipeStep.create({value: 2, instruction: 'mix together wet ingredients', recipe_id: 1})
commentrec1 = RecipeComment.create({user_id: 2, recipe_id: 2, comment: "My family loved this!"})
commentrec2 = RecipeComment.create({user_id: 1, recipe_id: 1, comment: "Made this for the Superbowl and it was a hit"})
flour = Ingredient.create({value: 1, name: "flour", measurement: "cup", recipe_id: 1})
carrot = Ingredient.create({value: 2, name: "carrots", measurement: "cup", recipe_id: 1})
chips = Ingredient.create({value: 1, name: "tortilla chips", measurement: "bag", recipe_id: 2})
gb = Ingredient.create({value: 1, name: "ground beef", measurement: "pound", recipe_id: 2})
fav = Favorite.create({user_id: 1, recipe_id: 2})