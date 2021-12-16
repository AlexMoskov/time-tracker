FactoryBot.define do
  factory :time_slot do
    start_time { DateTime.current - 1.hour }
    end_time { DateTime.current - 10.minutes }
    description { Faker::Lorem.sentence(word_count: 5) }
    user { create(:user) }
  end
end
