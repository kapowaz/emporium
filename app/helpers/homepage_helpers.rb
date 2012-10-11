# encoding: utf-8
class Emporium < Sinatra::Base
  module HomepageHelpers
    # generate an offer block for the homepage, e.g.
    # 
    # offer_block(
    #   :name       => "20percent_off", 
    #   :title      => "20% off prints", 
    #   :body       => "when you spend £10", 
    #   :discount   => "20% off", 
    #   :link_title => "Buy Prints", 
    #   :href       => "/shop/prints"
    # )
    
    def offer_block(opts={})
      partial :offer_block, :locals => opts
    end
    
    # generate a carousel with data according to the provided type
    def carousel(type)
      
      # home carousel data looks like:
      # 
      # {
      #   :duration => 5000,
      #   :loop     => :forever,
      #   :slides   => [
      #     {
      #       :color         => "#f3a6be",
      #       :href          => "/shop/photo-books",
      #       :title         => "What's hot",
      #       :content_title => "35% off Photo Books* Private Sale",
      #       :content_body  => "Buy credit now to spend later",
      #       :conditions    => "Selected books only",
      #       :link          => "Shop Now",
      #       :sash          => "Private sale - 35% OFF selected Photo Books"
      #       :theme         => :dark
      #     },
      #     {
      #       ...
      #     }
      #   ]
      # }
      
      case type
        when :home
          partial :carousel_home
        else
          partial :carousel_generic
      end
    end
    
    # temporary — is there a logged in user?
    def logged_in?
      false
    end
    
  end
  
  helpers HomepageHelpers
end