require 'bundler'
Bundler.require

require 'sinatra/asset_pipeline'

class Emporium < Sinatra::Base
  set :views,                 File.dirname(__FILE__) + '/app/views'
  set :public_folder,         File.dirname(__FILE__) + '/public'
  set :app_root,              File.expand_path(File.dirname(__FILE__))
  set :assets_prefix,         %w(app/assets)
  set :assets_precompile,     %w(templates.js vendor.js application.js application.css *.ico *.png *.jpg)
  set :assets_protocol,       :https
  set :assets_css_compressor, :sass
  set :assets_js_compressor,  :uglify

  register Sinatra::AssetPipeline

end

Dir[File.join(File.dirname(__FILE__), 'app/**/*.rb')].sort.each { |f| require f }