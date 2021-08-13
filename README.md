This Web Application allows users to cultivate a playlist that can be uploaded to their personal Spotify account.
Note: you must have a spotify account to use this app. Users can easily make a free spotify account either at https://www.spotify.com/ or by simply loading Grooving which will automatically direct them to spotify login/sign-up

Link To Deployed Application:
https://zorro1rr.github.io/grooving/

Running locally:

1. clone the project to your computer
2. create a .env file in the root of the project and contact Justin Howard for the required env variable
3. cd into the project directory and run "npm install"
4. run "npm start"
5. Open up localhost:3000 in a web browser

Using Grooving:
-On page load you will be directed to directed to spotify login which provides the auth token that will be used to query your spotify playlist and preform CRUD operations.
-Once redirected back to Grooving search for any content you are interested in.
-Results will appear in the block on the left where you can listen to 30 seconds samples or add them to the playlist maker block on the right
-Once you're happy with your playlist press "SAVE TO SPOTIFY" and you will see your new playlist updated on the far left where you also have the option to delete any playlist.
-Enjoy the tunes!

MIT License

Copyright (c) [2021] [Justin Howard]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
