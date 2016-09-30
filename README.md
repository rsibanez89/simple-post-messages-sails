# Example application to learn sailsjs
Simple web application developed by using Nodejs + Sails.
This application allow you to post messages and remove them.

## Doing it yourself
1. install nodejs (https://nodejs.org/)
2. install sails (remember tu use admin rights when open CMD, I'm using windows)
	```sh
	$ npm -g install sails
	```
3. create a new sails project
	```sh
	$ sails new simple-post-messages-sails
	```
4. start the app
	```sh
	$ cd simple-post-messages-sails
  $ sails lift
	```
5. go to http://localhost:1337/

Nothing new, that is the staring guide from sails (http://sailsjs.org/get-started)

We don't need a user for this example so we are not going to create a user api. Instead we are going to ceate a message api
6. create the Message model and the MessageController controller
	```sh
	$ sails generate api message
	```
	that will create two files
	-	api/controllers/MessageController.js
	- api/models/Message.js
7. edit the message model to ensure it has the next attributes
	```js
	attributes: {
		author : { type: 'string' },
		email : { type: 'string' },
		content : { type: 'string' }
	}
	```
8. start the app
		```sh
	  $ sails lift
		```
		Once you modify the sails project it will throw you a warning, because you didn't configure what to do with the stored data. You got 3 options, select 2 for now. Or edit the file "config/models.js" uncommenting the line "migrate: 'safe'"
9. go to http://localhost:1337/message
	it will return a json object with all the create messages []. None for now.
