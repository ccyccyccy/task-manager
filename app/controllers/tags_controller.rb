class TagsController < ApplicationController
  # GET /tags
  def index
    @tags = Tag.all
  end

  # GET /tags/1
  def show
    @tag = Tag.find(params[:id])
  end

  # GET /tags/new
  def new
    @tag = Tag.new
  end

  # GET /tags/1/edit
  def edit
    @tag = Tag.find(params[:id])
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

    if @tag.update(tag_params)
      redirect_to @tag
    else
      render 'edit'
    end
  end

  # DELETE /tags/1
  def destroy
    @tag = Tag.find(params[:id])
    @tag.destroy
    redirect_to :tasks
  end

  private
    def tag_params
      params.require(:tag).permit(:name)
    end
end
