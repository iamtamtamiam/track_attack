class CharactersController < ApplicationController
    def index
        characters = Character.all
        render json: CharacterSerializer.new(characters)
    end 



end 