Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  devise_for :users

  authenticated :user do
    root "pages#time_slots", as: :authenticated_root
  end

  root 'pages#home'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :time_slots, only: %i(index show create update destroy)
    end
  end
end
