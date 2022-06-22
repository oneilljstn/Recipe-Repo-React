
# Recipe Repo

A personal recipe repository built using React.

Initally built using the React tutorial by Shaun Pelling 
(NetNinja), I completed the tutortial and continued to 
improve and expand the design of the app to suit my own needs.
I love to cook and having converting my physical recipe collection to a digital one is something I have always wanted to do.
I orginially builts this project from the ground up using Python and Flask 9https://github.com/oneilljstn/Recipe-Repository-Python-Flask) and decided to redevelop it as an opportunity to learn React..


Features added:
 - Signup/login functionality using Firebase Authentication
 - Added the ability to add images to recipes and store them in Firebase Storage
 - Altered recipe deltetion to be an archive feature instead
 - New UI Elements (improved recipe grid, archive confirmation dialogue,)
 - Add ability to remove ingredients when adding new recipe
 - Search function now queries Firebase DB (title and ingredients) and amalgamates results   
 - Overhaul UI to use Bootstrap framework for more responsive UI
 - Add User Profile page where users can update profile information (email, password)
 - Add image upload progress bar using semantic UI framework
 - Added a private routing componenet to ensure only logged in users can access the app


 TODO
 - Convert Firebase upload/update code to custom hook
 - Improve mobile UI
 - Case desensitize search quieries
 - Add profile/logout dropdown to navbar
 - Add First name to user details
    - Sign up
    - Update Details
    - Welcome Message
 - Round the upload progress number to nearest int
 - Update recipe page progress bar not updating with progress
 - When updating an archived recipe keep it's archived status
 - When archiving a recipe redirect user back to homepage

## Screenshots

![Homepage](/Screenshots/homepage.png)
![Recipe Arhive](/Screenshots/archived.png)
![Recipe page](/Screenshots/recipe.png)
![Search](/Screenshots/search.png)
![New Recipe](/Screenshots/new_recipe.png)
![Sign in](/Screenshots/signin.png)
![Light Theme](/Screenshots/light_theme.png)


## Installation and Setup

Clone this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Start Server:

`npm start`  

To visit App:

`localhost:3000/`  



