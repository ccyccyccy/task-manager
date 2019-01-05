class TasksController < ApplicationController
  # GET /tasks
  # GET /tasks.json
  def index
    @tasks = @current_user.tasks
    @tags = @current_user.tags
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show
    @task = Task.find(params[:id])
  end

  # GET /tasks/new
  def new
    @task = Task.new
  end

  # GET /tasks/1/edit
  def edit
    @task = Task.find(params[:id])
  end

  # POST /tasks
  def create
    @task = Task.new(task_params)
    if @task.save
      redirect_to tasks_path
    else 
      render 'new' 
    end
  end

  # PATCH/PUT /tasks/1
  def update
    @task = Task.find(params[:id])

    if @task.update(task_params)
      redirect_to tasks_path
    else
      render 'edit'
    end
  end

  # DELETE /tasks/1
  def destroy
    @task = Task.find(params[:id])
    @task.destroy

    redirect_to tasks_path
  end

  private
    def task_params
      params.require(:task).permit(:title, :remarks, :tag_ids => []).merge(user_id: @current_user.id)
    end
end
