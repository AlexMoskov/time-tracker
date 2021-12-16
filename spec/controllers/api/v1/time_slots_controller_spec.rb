require 'rails_helper'

describe Api::V1::TimeSlotsController do
  let(:user) { create(:user) }
  let(:authorized_error) { 'You are not authorized to perform this action.' }
  let(:params) { {} }

  before do
    create(:time_slot, user: user)
    allow(controller).to receive(:current_user).and_return(user)
  end

  describe 'GET /api/v1/time_slots' do
    subject { get :index, params: params }

    it "calls #authenticate_user!" do
      expect(controller).to receive(:authenticate_user!)
      subject
    end

    describe 'when authenticate user' do
      before do
        allow(controller).to receive_messages(:authenticate_user! => true)
      end

      it { is_expected.to be_successful }

      it 'returns time slots for current_user' do
        subject
        body = JSON.parse(response.body)
        expect(body.length).to eq(user.time_slots.count)
      end
    end

    describe 'when not authenticate user' do
      it 'returns time slots for current_user' do
        subject
        expect(response.status).to eq(302)
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe 'GET /api/v1/time_slots/:id' do
    let(:time_slot) { user.time_slots.first }
    let(:params) { { id: time_slot.id } }

    subject { get :show, params: params }

    it "calls #authenticate_user!" do
      expect(controller).to receive(:authenticate_user!)
      subject
    end

    describe 'when authenticate user' do
      before do
        allow(controller).to receive_messages(:authenticate_user! => true)
      end

      it { is_expected.to be_successful }

      it 'returns time slot for current_user' do
        subject
        body = JSON.parse(response.body)
        expect(body['description']).to eq(time_slot.description)
      end

      describe 'when user not authorized' do
        before do
          allow(controller).to receive_messages(:authorized? => false)
        end

        it 'returns authorized error' do
          subject
          expect(response.status).to eq(401)
          body = JSON.parse(response.body)
          expect(body['error']).to eq(authorized_error)
        end
      end
    end

    describe 'when not authenticate user' do
      it 'redirects to sign in page' do
        subject
        expect(response.status).to eq(302)
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe 'POST /api/v1/time_slots' do
    let(:time_slot) { user.time_slots.first }
    let(:new_description) { 'New Description' }
    let(:start_time) { DateTime.current - 30.minutes }
    let(:end_time) { DateTime.current - 5.minutes }
    let(:approved) { false }
    let(:params) do
      {
        time_slot: {
          id: time_slot.id,
          start_time: start_time,
          end_time: end_time,
          description: new_description,
          approved: approved
        }
      }
    end

    subject { post :create, params: params }

    it "calls #authenticate_user!" do
      expect(controller).to receive(:authenticate_user!)
      subject
    end

    describe 'when authenticate user' do
      before do
        allow(controller).to receive_messages(:authenticate_user! => true)
      end

      it { is_expected.to be_successful }

      it 'creates new time slot for current_user' do
        expect { subject }.to change { user.time_slots.count }.by(1)
        body = JSON.parse(response.body)
        expect(body['description']).to eq(new_description)
        expect(body['approved']).to eq(approved)
      end

      describe 'when user not authorized' do
        before do
          allow(controller).to receive_messages(:authorized? => false)
        end

        it 'returns authorized error' do
          subject
          expect(response.status).to eq(401)
          body = JSON.parse(response.body)
          expect(body['error']).to eq(authorized_error)
        end
      end
    end

    describe 'when not authenticate user' do
      it 'redirects to sign in page' do
        subject
        expect(response.status).to eq(302)
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe 'PUT /api/v1/time_slots/:id' do
    let(:time_slot) { user.time_slots.first }
    let(:new_description) { 'New Description' }
    let(:start_time) { time_slot.start_time }
    let(:end_time) { time_slot.end_time }
    let(:approved) { !time_slot.approved }
    let(:params) do
      {
        id: time_slot.id,
        time_slot: {
          start_time: start_time,
          end_time: end_time,
          description: new_description,
          approved: approved
        }
      }
    end

    subject { put :update, params: params }

    it "calls #authenticate_user!" do
      expect(controller).to receive(:authenticate_user!)
      subject
    end

    describe 'when authenticate user' do
      before do
        allow(controller).to receive_messages(:authenticate_user! => true)
      end

      it { is_expected.to be_successful }

      it 'updates time slot for current_user' do
        expect { subject }.to_not change { user.time_slots.count }
        body = JSON.parse(response.body)
        expect(body['description']).to eq(new_description)
        expect(body['approved']).to eq(approved)
      end

      describe 'when user not authorized' do
        before do
          allow(controller).to receive_messages(:authorized? => false)
        end

        it 'returns authorized error' do
          subject
          expect(response.status).to eq(401)
          body = JSON.parse(response.body)
          expect(body['error']).to eq(authorized_error)
        end
      end
    end

    describe 'when not authenticate user' do
      it 'redirects to sign in page' do
        subject
        expect(response.status).to eq(302)
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe 'DELETE /api/v1/time_slots/:id' do
    let(:time_slot) { user.time_slots.first }
    let(:params) { { id: time_slot.id } }

    subject { delete :destroy, params: params }

    it "calls #authenticate_user!" do
      expect(controller).to receive(:authenticate_user!)
      subject
    end

    describe 'when authenticate user' do
      before do
        allow(controller).to receive_messages(:authenticate_user! => true)
      end

      it { is_expected.to be_successful }

      it 'deletes time slot for current_user' do
        expect { subject }.to change { user.time_slots.count }.by(-1)
        expect(user.time_slots.count).to be_zero
      end

      describe 'when user not authorized' do
        before do
          allow(controller).to receive_messages(:authorized? => false)
        end

        it 'returns authorized error' do
          subject
          expect(response.status).to eq(401)
          body = JSON.parse(response.body)
          expect(body['error']).to eq(authorized_error)
        end
      end
    end

    describe 'when not authenticate user' do
      it 'redirects to sign in page' do
        subject
        expect(response.status).to eq(302)
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
