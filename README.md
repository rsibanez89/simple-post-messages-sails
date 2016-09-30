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

	..- api/controllers/MessageController.js
	..- api/models/Message.js
	
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

9. go to http://localhost:1337/message/

it will return a json object with all the create messages []. None for now.

10. create a view for the message. Remove the contet form the homepage, we are not going to need it, and add the following HTML code.

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

11. start the app and go to http://localhost:1337/. 

its is awful, It doesn't have any style and it doesn't make any validation. It just store what I send in the form. But, its working. We can add new messages and then go to http://localhost:1337/message/ and check them all.


	