class TasksController < ApplicationController
  def index
    @tasks = @current_user.tasks
    @tags = @current_user.tags
  end

  def show
    @task = Task.find(params[:id])
    authenticate_user
    render plain: @task.remarks
  end

  def new
    @task = Task.new
  end

  def edit
    @task = Task.find(params[:id])
    authenticate_user
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

    if @task.update(task_params)
      redirect_to tasks_path
    else
      render 'edit'
    end
  end

  def destroy
    @task = Task.find(params[:id])
    authenticate_user
    @task.destroy

    redirect_to tasks_path
  end

  private
    def task_params
      params.require(:task).permit(:title, :remarks, :tag_ids => []).merge(user_id: @current_user.id)
    end

    def authenticate_user
      redirect_to root_path if @current_user.id != @task.user_id
    end
end
