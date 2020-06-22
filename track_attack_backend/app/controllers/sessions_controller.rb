class SessionsController < ApplicationController

    def create
        
        user = User.find_by(username: params[:username])
        
        if user && user.password == params[:password]
            session[:user_id] = user.id
            render json: UserSerializer.new(user)
          else
            render json: { status: 401 }
        end

    end 

    def destroy
      session.destroy
      render json: {
        session: session[:user_id],
        current_user: current_user,
        message: "you are logged out"}
    end 

    private

    def current_user
      @current_user ||= User.find_by_id(session[:user_id]) if session[:user_id]
    end 

end 