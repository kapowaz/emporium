class Emporium < Sinatra::Base
  module SiteHelpers
    # generate a given product navigation flyout menu container
    def product_navigation(name)
      partial "product_navigation#{name == :shop ? "_shop": nil}".to_sym, :locals => @product_categories[name]
    end
  end
  
  helpers SiteHelpers
end