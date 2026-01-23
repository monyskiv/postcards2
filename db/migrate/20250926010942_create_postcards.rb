class CreatePostcards < ActiveRecord::Migration[7.2]
  def change
    create_table :postcards do |t|
      t.string :title, null: false
      t.string :author, null: false
      t.string :year, null: false
      t.string :color
      t.string :image, default: 'https://ui.org.ua/wp-content/uploads/2022/06/card4.jpg'

      t.timestamps
    end
  end
end
