# encoding: utf-8
class Emporium < Sinatra::Base
  before do
    @page[:class] = "shop"
  end
  
  get "/shop" do
    erb :shop
  end
end