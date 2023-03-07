class RecipeSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :category, :image
  belongs_to :user
  has_many :ingredients
  has_many :recipe_steps
  has_many :favorites
  has_many :recipe_comments, serializer: RecipeCommetSerializer
  has_many :favorited_users

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end
end
