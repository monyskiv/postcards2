## Destroy all postcards
Postcard.destroy_all

## Add 100 postcards
100.times do |i|
  Postcard.create(
    title: "Postcard #{i + 1}",
    author: "Taras Shevchenko",
    year: "2022",
    color: "Multi",
  )
end