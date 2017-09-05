require "rails_helper"

describe "GoalApiTests", type: :request do

  describe "GET #index" do
    it "resonds with success and status" do
      get "/goals"
      json = JSON.parse(response.body)
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end
  end

  describe "GET single goal" do
    it "returns expected json" do
      goal = FactoryGirl.create(:goal)
      get "/goals/#{goal.id}"
      expect(response).to be_success
      expect(response).to have_http_status(200)
      parsed_body = JSON.parse(response.body)
      expect(parsed_body).to match(goal.as_json)
    end
  end

  describe "POST create goal" do
    it "creates new goal" do
      goal_params = FactoryGirl.attributes_for(:goal)
      post "/goals", params: {:goal => goal_params}
      expect(response).to be_success
      expect(response).to have_http_status(201)
      expect { post "/goals", params: {:goal => goal_params} }.to change(Goal, :count).by(1)
    end
  end

  describe "DELETE goal" do
    it "deletes single goal" do
      goal = FactoryGirl.create(:goal)
      delete "/goals/#{goal.id}"
      expect(response).to be_success
      expect(response).to have_http_status(204)
    end
  end

  describe "UPDATE goal" do
    it "updates goal" do
      goal = FactoryGirl.create(:goal)
      goal_params = FactoryGirl.attributes_for(:goal)
      put "/goals/#{goal.id}" , params: {goal: goal_params}
      expect(response).to be_success
      expect(response).to have_http_status(200)
      parsed_body = JSON.parse(response.body)
      expect(parsed_body).to match(goal.as_json)
    end
  end
end
