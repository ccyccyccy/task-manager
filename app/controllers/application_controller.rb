class ApplicationController < ActionController::Base
  before_action :get_current_user
 
  private
 
  def get_current_user
    @current_user = User.find(cookies[:user_id])
  rescue ActiveRecord::RecordNotFound
    @current_user = User.create
    cookies.permanent[:user_id] = @current_user.id
  end

end