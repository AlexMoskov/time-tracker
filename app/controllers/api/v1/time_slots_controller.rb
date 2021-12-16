class Api::V1::TimeSlotsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_time_slot, only: %i(show edit update destroy)

  def index
    @time_slots = current_user.time_slots

    render json: @time_slots.to_json
  end

  def show
    if authorized?
      render json: @time_slot.to_json
    else
      handle_unauthorized
    end
  end

  def create
    @time_slot = current_user.time_slots.build(time_slot_params)

    if authorized?
      if @time_slot.save
        render json: @time_slot.to_json, status: :created, location: api_v1_time_slot_path(@time_slot)
      else
        render json: { error: @time_slot.errors.full_messages.join(' ') }, status: :unprocessable_entity
      end
    else
      handle_unauthorized
    end
  end

  def update
    if authorized?
      if @time_slot.update(time_slot_params)
        render json: @time_slot.to_json, status: :ok, location: api_v1_time_slot_path(@time_slot)
      else
        render json: { error: @time_slot.errors.full_messages.join(' ') }, status: :unprocessable_entity
      end
    else
      handle_unauthorized
    end
  end

  def destroy
    if authorized?
      if @time_slot.destroy
        render json: { status: 'ok' }, status: :ok
      else
        render json: { error: @time_slot.errors.full_messages.join(' ') }, status: :unprocessable_entity
      end
    else
      handle_unauthorized
    end
  end

  private

  def set_time_slot
    @time_slot = TimeSlot.find(params[:id])
  end

  def authorized?
    @time_slot.user == current_user
  end

  def handle_unauthorized
    unless authorized?
      render json: { error: 'You are not authorized to perform this action.' }, status: 401
    end
  end

  def time_slot_params
    params.require(:time_slot).permit(:start_time, :end_time, :description, :approved)
  end
end
