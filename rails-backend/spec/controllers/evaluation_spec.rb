require "rails_helper"

describe "EvaluationApiTests", type: :request do

  describe "GET #index" do
    it "responds with success and status" do
      get "/evaluations"
      json = JSON.parse(response.body)
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end
  end

  describe "GET single evaluation" do
    it "returns expected json" do
      evaluation = FactoryGirl.create(:evaluation)
      get "/evaluations/#{evaluation.id}"
      expect(response).to be_success
      expect(response).to have_http_status(200)
      parsed_body = JSON.parse(response.body)
      expect(parsed_body).to match(evaluation.as_json)
    end
  end

  describe "POST create evaluation" do
    it "creates new evaluation" do
      evaluation_params = FactoryGirl.attributes_for(:evaluation)
      post "/evaluations", params: {:evaluation => evaluation_params}
      expect(response).to be_success
      expect(response).to have_http_status(201)
      expect { post "/evaluations", params: {:evaluation => evaluation_params} }.to change(Evaluation, :count).by(1)
    end
  end

  describe "DELETE evaluation" do
    it "deletes single evaluation" do
      evaluation = FactoryGirl.create(:evaluation)
      delete "/evaluations/#{evaluation.id}"
      expect(response).to be_success
      expect(response).to have_http_status(204)
    end
  end

  describe "UPDATE evaluation" do
    it "updates evaluation" do
      evaluation = FactoryGirl.create(:evaluation)
      evaluation_params = FactoryGirl.attributes_for(:evaluation)
      put "/evaluations/#{evaluation.id}" , params: {evaluation: evaluation_params}
      expect(response).to be_success
      expect(response).to have_http_status(200)
      parsed_body = JSON.parse(response.body)
      expect(parsed_body).to match(evaluation.as_json)
    end
  end
end
