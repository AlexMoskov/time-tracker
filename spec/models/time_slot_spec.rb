require 'rails_helper'

describe TimeSlot do
  context "valid Factory" do
    it "has a valid factory" do
      expect(build(:time_slot)).to be_valid
    end
  end

  describe "Associations and Validations" do
    before { create(:time_slot) }

    it { is_expected.to belong_to :user }

    context "presence" do
      it { is_expected.to validate_presence_of(:start_time) }
      it { is_expected.to validate_presence_of(:end_time) }
      it { is_expected.to validate_presence_of(:description) }
    end
  end

  context 'duration' do
    let(:time_slot) { build(:time_slot) }
    let(:duration) { time_slot.end_time - time_slot.start_time }

    it 'returns duration' do
      expect(time_slot.duration).to eq(duration)
    end
  end
end
