class TimeSlot < ApplicationRecord
  default_scope { order(created_at: :desc) }

  belongs_to :user

  validates :start_time, :end_time, :description, presence: true

  validate :check_range

  def duration
    return 0 if start_time.blank? || end_time.blank?

    end_time - start_time
  end

  private

  def check_range
    if start_time.blank? || end_time.blank? || start_time > end_time
      errors.add(:base, 'The time range is incorrect')
    end
  end
end
