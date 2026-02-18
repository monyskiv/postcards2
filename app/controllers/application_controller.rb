class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  private 
  
  def paginate_postcards(postcards, postcards_per_page)
    paginated_postcards = postcards.page(params[:page]).per(postcards_per_page)
  end
end
