class ListsController < ApplicationController
    before_action :set_list, only: [:show, :update, :destroy]
    # skip_before_action :authorized, only: :index

    def index
        user = User.find(session[:user_id])
        render json: user.lists.all
    end

    def show
        render json: @list
    end

    def create
        user = User.find(session[:user_id])
        list = user.lists.create(name: params[:name])
        render json: list
    end

    def update
        user = User.find(session[:user_id])
        list = user.lists.find_by(id: params[:id])
        list.update(list_params)
        render json: list
    end

    def destroy
        user = User.find(session[:user_id])
        list = user.lists.find_by(id: params[:id])
        list.destroy
        head :no_content
    end

    private

    def list_params
        params.permit(:name)
    end

    def set_list
        @list = List.find(params[:id])
    end
end
