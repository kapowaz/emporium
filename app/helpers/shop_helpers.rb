class Emporium < Sinatra::Base
  module ShopHelpers    
    def shop_hero(options)
      partial :shop_hero, :locals => options
    end
    
    def shop_product_categories
      partial :shop_product_categories, :locals => {:categories => YAML.load(File.new("app/data/product_categories_shop.yml"))}
    end
  end
  
  helpers ShopHelpers
end