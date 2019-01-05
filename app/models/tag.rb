class Tag < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :user_id, message: "tag already exists" }
  has_and_belongs_to_many :tasks
  belongs_to :user
end
