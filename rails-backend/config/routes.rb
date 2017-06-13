Rails.application.routes.draw do
  get 'users/me', to: 'users#me'
  get 'users/subordinates', to: 'users#subordinates'

  resources :plans
  resources :users
  resources :goals
  resources :evaluations
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
