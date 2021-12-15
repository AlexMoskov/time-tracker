require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get pages_home_url
    assert_response :success
  end

  test "should get time_slots" do
    get pages_time_slots_url
    assert_response :success
  end
end
