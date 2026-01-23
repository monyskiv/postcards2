class AddGinIndexToPostcards < ActiveRecord::Migration[7.2]
  def change
    add_index :postcards, 
      [:title, :author, :year], 
      using: :gin, 
      opclass: { title: :gin_trgm_ops, author: :gin_trgm_ops, year: :gin_trgm_ops }
  end
end
