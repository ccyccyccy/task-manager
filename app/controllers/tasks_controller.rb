class TasksController < ApplicationController
  # what is this line for?
  # respond_to :html, :js

  def index
    @sort_order = params[:sort_order] ? params[:sort_order] : 'created_at desc'
    @tasks = @current_user.tasks
    @tags = @current_user.tags
  end

  def create
    @task = Task.new(task_params)
    if authenticate_user
      @task.save
      redirect_to tasks_path
    end
  end

  def update
    @task = Task.find(params[:id])
    @task.update(task_params) if authenticate_user
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy if authenticate_user
  end

  private
    def task_params
      params.require(:task).permit(:title, :remarks, :tag_ids => []).merge(user_id: @current_user.id)
    end

    def authenticate_user
      return @current_user.id == @task.user_id
    end
end
