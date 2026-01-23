class Api::V1::SearchController < ApplicationController
  def postcards
    # Calling the reusable scope defined in the model
    @postcards = Postcard.search_by_keywords(params[:q]) 
    render json: @postcards
  end
end
