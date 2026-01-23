9.times do |i|
  Postcard.create(
    title: "Postcard #{i + 1}",
    author: "Taras Shevchenko",
    year: "2022",
    color: "Multi",
  )
end