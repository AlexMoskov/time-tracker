class TimeSlot < ApplicationRecord
  default_scope { order(created_at: :desc) }

  belongs_to :user

  validates :start_time, :end_time, :description, presence: true
end
