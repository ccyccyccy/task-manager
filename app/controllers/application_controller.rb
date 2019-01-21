class ApplicationController < ActionController::Base
  before_action :get_current_user, :get_sort_order
 
  private
 
  def get_current_user
    @current_user = User.find(cookies[:user_id])
  rescue ActiveRecord::RecordNotFound
    @current_user = User.create
    cookies.permanent[:user_id] = @current_user.id
  end

  def get_sort_order
    @sort_order = params[:sort_order] ? params[:sort_order] : 'created_at desc'
  end

end