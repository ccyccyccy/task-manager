module TasksHelper
  # accounts for cases where it is sorted by other means as well as sorted by date already
  def click_date_order
    return @sort_order == 'created_at asc' ? 'created_at desc' : 'created_at asc'
  end

  def click_title_order
    return @sort_order == 'title asc' ? 'title desc' : 'title asc'
  end

  def get_tags(task)
    return task.tags.order(:name).collect do |tag|
      link_to tag.name, tag
    end.join(" ")
  end
end
