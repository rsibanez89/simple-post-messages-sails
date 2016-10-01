# Example application to learn sailsjs
Simple web application developed by using Nodejs + Sails.
This application allow you to post messages and remove them.

## Doing it yourself
1. Install nodejs (https://nodejs.org/)
2. Install sails (remember tu use admin rights when open CMD, I'm using windows)

	```sh
	$ npm -g install sails
	```
	
3. Create a new sails project

	```sh
	$ sails new simple-post-messages-sails
	```
	
4. Start the app

	```sh
	$ cd simple-post-messages-sails
	$ sails lift
	```

5. Go to http://localhost:1337/

Nothing new, that is the staring guide from sails (http://sailsjs.org/get-started)

We don't need a user for this example so we are not going to create a user api. Instead we are going to ceate a message api

6. Create the Message model and the MessageController controller

	```sh
	$ sails generate api message
	```
	
That will create two files

	- "api/controllers/MessageController.js"
	- "api/models/Message.js"
	
7. Edit the message model to ensure it has the next attributes

	```js
	attributes: {
		author : { type: 'string' },
		email : { type: 'string' },
		content : { type: 'string' }
	}
	```

8. Start the app

	```sh
	$ sails lift
	```
		
Once you modify the sails project it will throw you a warning because you didn't configure what to do with the stored data. You have 3 options, select 2 for now. Or edit the file "config/models.js" uncommenting the line "migrate: 'safe'".

9. Go to http://localhost:1337/message/

It will return a json object with all the created messages []. None for now.

10. Create a view for the message. Remove all the contet form the "view/homepage.ejs", we are not going to need it. Add the following HTML code.

```html
<div id="newMessage">
  <h1>Add a new message</h1>

  <form action="/message" method="post">

    <div class="field-wrap">
      <label>
        Full Name<span class="req">*</span>
      </label>
      <input name="author" type="text" required autocomplete="off" />
    </div>

    <div class="field-wrap">
      <label>
        Email Address<span class="req">*</span>
      </label>
      <input name="email" type="email" required autocomplete="off"/>
    </div>

    <div class="field-wrap">
      <label>
        Message<span class="req">*</span>
      </label>
	  <textarea name="content" required>Enter text here...</textarea>
    </div>

    <button type="submit" class="button button-block"/>Post</button>

  </form>
</div>
```

Note that we just included the content, we didn't include the header of the HTML. That is because sails inject this code inside "view/layout.ejs" where the tag "<%- body %>" is.

11. Start the app and go to http://localhost:1337/. 

It is awful, It doesn't have any style and it doesn't validate any data. It just store what I send in the form but it's working. We can add new messages and then go to http://localhost:1337/message/ and check them all.

12. Create the HomepageController controller

	```sh
	$ sails generate controller homepage
	```

13. Modify the "config/routes.js"

	Replace these lines. This code is saying: everytime someone hit '/' render the view homepage.
	```js
	'/': {
		view: 'homepage'
	}
	```
	
	With this one. This code is saying: everytime someone hit '/' execute the function index in the HomepageController.
	```js
	'/': 'HomepageController.index'
	```
	
13. Create a the index function in the "api/controllers/HomepageController.js"

	```js
	index: function(req, res, next) {
		console.log("MessageController  was called");
		res.view('homepage');
	}
	```
