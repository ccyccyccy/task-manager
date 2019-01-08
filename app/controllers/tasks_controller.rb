class TasksController < ApplicationController
  def index
    @tasks = @current_user.tasks
    @tags = @current_user.tags
  end

  def show
    @task = Task.find(params[:id])
    if authenticate_user
      render plain: @task.remarks 
    else
      redirect_to tasks_path
    end
  end

  def new
    @task = Task.new
  end

  def edit
    @task = Task.find(params[:id])
    redirect_to tasks_path if !authenticate_user
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      redirect_to tasks_path
    else 
      render 'new' 
    end
  end

  def update
    @task = Task.find(params[:id])
    if authenticate_user
      @task.update(task_params)
    end
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy if authenticate_user
    redirect_to tasks_path
  end

  private
    def task_params
      params.require(:task).permit(:title, :remarks, :tag_ids => []).merge(user_id: @current_user.id)
    end

    def authenticate_user
      return @current_user.id == @task.user_id
    end
end
