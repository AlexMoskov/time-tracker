# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
3.times do |i|
  User.create(
    email: "user-#{i+1}@example.com",
    password: "password",
    password_confirmation: "password",
    first_name: "User-#{i+1}",
    last_name: "Test"
  )
end

time = DateTime.current - 10.days

User.all.each do |u|
  10.times do |i|
    u.time_slots.create(
      description: "#{i+1} lesson for #{u.email}",
      start_time: time + i.day,
      end_time: time + i.day + 30.minutes,
      approved: i % 3 == 0
    )
  end
end
