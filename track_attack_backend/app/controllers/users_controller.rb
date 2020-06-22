class UsersController < ApplicationController
    def index
        users = User.all
        render json: UserSerializer.new(users)
    end



    def create
        user = User.new(user_params)
        if user.save
            session[:user_id] = user.id
            render json: UserSerializer.new(user)
        else
            render json: {
                status: 401,
                main: user.errors.as_json(full_messages: true) 
                }
        end
    end 


    def show
        user = User.find_by(id: params[:id])
        if user
            render json: user
        else 
            render json: {message: 'user not found'}
        end
    end 



    private

    def user_params
        params.permit(:username, :password)
    end 

end
