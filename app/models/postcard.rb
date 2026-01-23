class Postcard < ApplicationRecord
  validates :title, presence: true
  validates :author, presence: true
  validates :year, presence: true

  scope :search_by_keywords, ->(query) {
    if query.present?
      search_fields = ['title', 'author', 'year']
      where_clause = search_fields.map { |field| "#{field} ILIKE :query" }.join(' OR ')
      where(where_clause, query: "%#{query}%")
    else
      all
    end
  }
end
