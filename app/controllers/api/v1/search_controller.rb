class Api::V1::SearchController < ApplicationController
  def postcards
    # Calling the reusable scope defined in the model
    postcards_per_page = 2
    @postcards = Postcard.search_by_keywords(params[:q]) 
    paginated_postcards = paginate_postcards(@postcards, postcards_per_page)
    total_postcards_count = @postcards.count

    render json: {
      postcards: paginated_postcards,
      total_count: total_postcards_count,
      per_page: postcards_per_page
    }
  end
end
