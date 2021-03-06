class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :first_name, :last_name, :email, presence: true

  validates_uniqueness_of :email, case_sensitive: false

  has_many :time_slots, dependent: :destroy

  def full_name
    "#{first_name} #{last_name}"
  end
end
