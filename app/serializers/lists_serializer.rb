class ListsSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :recipes
  belongs_to :user
end
