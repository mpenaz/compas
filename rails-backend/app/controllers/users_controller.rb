class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    if params[:mail] != nil
      @singleUser = User.find_by_email(params[:mail])
      render json: @singleUser.to_json(include: {plans: {include: [:goals, :evaluation]}})
    else
      @users = User.all
      render json: @users
    end
  end

  # GET /users/me
  def me
    render json: @current_user.to_json(include: {plans: {include: [:goals, :evaluation]}})
  end

  # GET /users/subordinates
  def subordinates
    subordinates = @current_user.subordinates
    render json: subordinates.to_json(include: {plans: {include: [:goals, :evaluation]}})
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.require(:user).permit(:name, :email)
  end
end
