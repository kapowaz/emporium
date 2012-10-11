# encoding: utf-8
class Emporium < Sinatra::Base
  error 403 do
    @page[:title] = "Forbidden"
    erb :forbidden
  end

  error 404 do
    @page[:title] = "Not Found"
    erb :notfound
  end  
end