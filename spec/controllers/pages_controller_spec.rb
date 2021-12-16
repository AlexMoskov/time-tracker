require 'rails_helper'

describe PagesController do
  describe "GET home" do
    it "renders the index template" do
      get :home
      expect(response).to render_template(:home)
    end
  end

  describe "GET time_slots" do
    it "renders the index template" do
      get :time_slots
      expect(response).to render_template(:time_slots)
    end
  end
end
