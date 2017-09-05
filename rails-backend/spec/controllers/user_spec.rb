require "rails_helper"

describe "UserApiTests", type: :request do

  describe "GET #index" do
    it "resonds with success and status" do
      get "/users"
      json = JSON.parse(response.body)
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end
  end

  describe "GET single user" do
    it "returns expected json" do
      user = FactoryGirl.create(:user)
      get "/users/#{user.id}"
      expect(response).to be_success
      expect(response).to have_http_status(200)
      parsed_body = JSON.parse(response.body)
      expect(parsed_body).to match(user.as_json)
    end
  end

  describe "POST create user" do
    it "creates new contact" do
      user_params = FactoryGirl.attributes_for(:user)
      post "/users", params: {:user => user_params}
      expect(response).to be_success
      expect(response).to have_http_status(201)
      expect { post "/users", params: {:user => user_params} }.to change(User, :count).by(1)
    end
  end

  describe "DELETE user" do
    it "deletes single user" do
      user = FactoryGirl.create(:user)
      delete "/users/#{user.id}"
      expect(response).to be_success
      expect(response).to have_http_status(204)
    end
  end

  describe "UPDATE user" do
    it "updates user" do
      user = FactoryGirl.create(:user)
      user_params = FactoryGirl.attributes_for(:user)
      put "/users/#{user.id}" , params: {user: user_params}
      expect(response).to be_success
      expect(response).to have_http_status(200)
      parsed_body = JSON.parse(response.body)
      expect(parsed_body).to match(user.as_json)
    end
  end
end
