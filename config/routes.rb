Rails.application.routes.draw do
  root to: 'main#index'

  get '/home', to: 'main#index'
  get '/finish-walk', to: 'main#finish_walk'
  get '/add-count-walk', to: 'main#add_count_walk'
end
