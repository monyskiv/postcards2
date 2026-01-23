class Api::V1::PostcardsController < ApplicationController
  before_action :set_postcard, only: %i[show destroy]

  def index
    postcard = Postcard.all.order(created_at: :desc)
    render json: postcard
  end

  def create
    postcard = Postcard.create!(postcard_params)
    if postcard
      render json: postcard
    else
      render json: postcard.errors
    end
  end

  def show
    render json: @postcard
  end

  def destroy
    @postcard&.destroy
    render json: { message: 'Postcard deleted!'}
  end

  private

  def postcard_params
    params.permit(:title, :author, :year, :color, :image)
  end

  def set_postcard
    @postcard = Postcard.find(params[:id])
  end
end
