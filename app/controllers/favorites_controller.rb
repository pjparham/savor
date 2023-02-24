class FavoritesController < ApplicationController
    # def create 
    #     user = User.find(session[:user_id])
    #     candle = Candle.find(params[:candle_id])
    #     favorite = user.favorites.create(candle_id: candle.id, user_id: user.id)
    #     render json: favorite
    # end

    # def destroy
    #     user = User.find(session[:user_id])
    #     favorite = user.favorites.find_by(candle_id: params[:candle_id])
    #     favorite.destroy
    #     head :no_content
    # end

end
