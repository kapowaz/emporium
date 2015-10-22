# encoding: utf-8
class Emporium < Sinatra::Base
  before do
    @page = { title: "Emporium" }
    @product_categories = {
      shop: YAML.load(File.new("app/data/product_categories_shop.yml"))
    }
  end

  get "/" do
    @side_block = {
      name:       "canvas_prints",
      title:      "Canvas Prints",
      body:       "Create a masterpiece today!",
      link_title: "Buy Canvas Prints",
      href:       "/shop/wall-decor/canvas-prints"
    }

    @offers   = YAML.load(File.new("app/data/homepage_offers.yml"))
    @carousel = {
      duration: 5000,
      loop:     :forever,
      slides:   YAML.load(File.new("app/data/homepage_carousel_items.yml"))
    }

    erb :index
  end
end