class User < ApplicationRecord
    
    has_many :games
  
    validates :username, :password, presence: true
    validates :username, uniqueness: true


end
