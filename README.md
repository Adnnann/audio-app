# Description

This is app that enables user to meditate by listening music.

User can select login by signin up for the account and then loging in OR user can log in with his or her FB account.

In case when user is loged with FB account user profile data fetched from FB login API are stored in Mongo DB to enable tracking of user stats. User stats include number of mindful minutes (how much time user spent in listening music). After each pause calculation is done to subtract previous recorded time from current time in order to get only length of time spent on listening any individual time. At the end of each audio file event is triggered and total length of audio file is stored in mindful minutes data while previous data (paused time) is removed

At the end of each audio file, file name is stored in sessions array to calculate full user sessions (number of audio files that were listened all the way to the end).

Furthermore when user clicks on play button calculation of day streak is done (number of days in row when user used app). If user used app for 2 days and then skipped day three calculation of his streak will start again. Longest streak is caculated by comparing day streak length with previous recorded data for longest streak. If day streak is > than longest streak, longest streak will be updated.

To test streak calculation on line 172 in file AudioPlayer.js add number of days on following var
 let streak = `${new Date().getUTCMonth()}/${new Date().getUTCDate()<ADD HERE>}/${new Date().getUTCFullYear()}`
  

Audio files are stored on Express server (folder files). When user is logged in, all file names are fetched from server. Naming convention for files is:
fileTitle_fileCategory_fileLength_fileType(audio - mp3 images - jpeg)

Saving files with above naming convention is enabling filtering and all other available actions  (file name string is used for all data manipulation)

For user logged with facebook random password will be assigned and on redirect user will get to see assigned password and asked to change password as soon as possible. However, assigned password will be different for each user so in case user continues using assigned password that will not impose to high security risk. Password for FB users is to be used if user would like to log in without Facebook (for example user close his FB account.)

Finally if credentials for Facebook login api are not stored in config file in case user tries to login with facebook, he will be redericted to error page. 

User can click on hearth icon to save favorite audio file. User is enabled to change his mind by clicking on hearth icon again.

## Important

To use app user has to store following data in .env on server

DATABASE==<Atlas MongoDB database name>
PASSWORD=<Atlas MongoDB database password>
CLIENTID=<Facebook login API CLIENT ID>
CLIENTSECRET=<Facebook login API CLIENT SECRET>

## UI

Material UI is used for UI

## State management

Redux toolkit and axios are used for state management and fetching of data from the server

## Server

Express is used for creating server

