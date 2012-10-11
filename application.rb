require 'rubygems'
require 'bundler'
require 'YAML'
Bundler.require

class Emporium < Sinatra::Base
    
  set :views,                   File.dirname(__FILE__) + '/app/views'
  set :public,                  File.dirname(__FILE__) + '/public'
  
end

Dir[File.join(File.dirname(__FILE__), 'app/**/*.rb')].sort.each { |f| require f }