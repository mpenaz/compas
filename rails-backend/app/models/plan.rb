class Plan < ApplicationRecord
  has_many :goals
  belongs_to :evaluation, optional: true
end