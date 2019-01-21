class TagsController < ApplicationController
  # GET /tags
  def index
    @tags = @current_user.tags
  end

  # GET /tags/1
  def show
    @tag = Tag.find(params[:id])
    @tasks = @tag.tasks if authenticate_user
  end

  # GET /tags/new
  def new
    @tag = Tag.new
  end

  # GET /tags/1/edit
  def edit
    @tag = Tag.find(params[:id])
    authenticate_user
  end

  # POST /tags
  def create
    @tag = Tag.new(tag_params)
    if @tag.save
      redirect_to :tasks
    else
      render 'new'
    end
  end

  # PATCH/PUT /tags/1
  def update
    @tag = Tag.find(params[:id])
    @tag.update(tag_params) if authenticate_user
    redirect_to tasks_path
  end

  # DELETE /tags/1
  def destroy
    @tag = Tag.find(params[:id])
    authenticate_user
    @tag.destroy
    redirect_to :tasks
  end

  private
    def tag_params
      params.require(:tag).permit(:name).merge(user_id: @current_user.id)
    end

    def authenticate_user
      return @current_user.id == @tag.user_id
    end
end
