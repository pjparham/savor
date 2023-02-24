class UsersController < ApplicationController
    # skip_before_action :authorized, only: :create

    def create
        user = User.create!(user_params)
        render json: user
    end

    def show
        current_user = User.find(session[:user_id])
        render json: current_user
    end

    private
    def user_params
        params.permit(:username, :password, :first_name, :last_name, :email)
    end
end
