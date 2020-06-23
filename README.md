# track_attack

Track Attack is a single-page Javascript app (with rails backend) that allows users to keep score on a score board. It is based on an elementary classroom game but can be used for games with scores of single increments (+1 or -1). 

## Installation
```
git clone https://github.com/iamtamtamiam/track_attack.git
cd track_attack_backend
rails db:migrate
rails db:seed
rails s
```

Then open index.html file (in track_attack_frontend folder) in your browser. 

### Usage

Users can sign up or log in. 

Once logged in, users can create a game and selecting characters for that game. Characters can be assigned player/team names. Each character can get multiple "plus one" or "minus one". The calculated current (and temporarily recorded) score will be displayed for each character.

Bonus: to assign a winner/winners, double-click on the character's image. 

Once a User exits the current game (either by viewing another game or logging out or creating a new game), the current game will be reset and can be viewed again by selecting it in the user's games selection bar. 

A game can also be deleted by the "Delete Game" button, if it is the current game being displayed. 


### Notes

This is my basic understanding of Rails JS. 

Any bugs or improvement suggestions that users may notice in the program can be brought to my attention via a pull request on the github repo.

For later stretch goals, I intend on adding the functionality of adding characters on frontend and more funtional scoring. 