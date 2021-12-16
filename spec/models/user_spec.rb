require 'rails_helper'

describe User do
  context "valid Factory" do
    it "has a valid factory" do
      expect(build(:user)).to be_valid
    end
  end

  describe "Associations and Validations" do
    before { create(:user) }

    it { is_expected.to have_many :time_slots }

    context "presence" do
      it { is_expected.to validate_presence_of(:first_name) }
      it { is_expected.to validate_presence_of(:last_name) }
      it { is_expected.to validate_presence_of(:email) }
      it { is_expected.to validate_presence_of(:password) }
    end
  end

  context 'full_name' do
    let(:user) { build(:user) }
    let(:full_name) { "#{user.first_name} #{user.last_name}" }

    it 'returns full name' do
      expect(user.full_name).to eq(full_name)
    end
  end
end
