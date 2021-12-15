class CreateTimeSlots < ActiveRecord::Migration[6.1]
  def change
    create_table :time_slots do |t|
      t.datetime :start_time
      t.datetime :end_time
      t.text :description
      t.boolean :approved, default: false, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
