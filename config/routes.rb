Rails.application.routes.draw do
  resources :users, only: [:show, :create]
  resources :recipes
  resources :favorites, only: [:destroy, :create]
  resources :recipe_comments, only: [:create, :destroy]
  get "/auth", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
