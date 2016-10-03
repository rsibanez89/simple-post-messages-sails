# Example application to learn sailsjs
Simple web application developed by using Nodejs + Sails.
This application allow you to post messages and remove them.

## Doing it yourself
### Setting up the environment
1. Install nodejs (https://nodejs.org/)
2. Install sails (remember to use admin rights when open CMD, I'm using windows)

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

### Posting messages

We don't need a user for this example so we are not going to create a user api. Instead we are going to create a message api

1. Create the Message model and the MessageController controller

	```sh
	$ sails generate api message
	```
	
	That will create two files

	- "api/controllers/MessageController.js"
	- "api/models/Message.js"
	
2. Edit the message model to ensure it has the next attributes

	```js
	attributes: {
		author : { type: 'string' },
		email : { type: 'string' },
		content : { type: 'string' }
	}
	```

3. Start the app

	```sh
	$ sails lift
	```
		
Once you modify the sails project it will throw you a warning because you didn't configure what to do with the stored data. You have 3 options, select 2 for now. Or edit the file "config/models.js" uncommenting the line "migrate: 'safe'".

4. Go to http://localhost:1337/message/

It will return a json object with all the created messages []. None for now.

5. Remove all the content form the "view/homepage.ejs", we are not going to need it. Add the following HTML code.

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

		<button type="submit" class="button"/>Post</button>

	  </form>
	</div>
	```

Note that we just included the content (body of the HTML), we didn't include the header of the HTML. That is because sails inject this code inside "view/layout.ejs" where the tag "<%- body %>" is.

6. Start the app and go to http://localhost:1337/. 

It is awful, It doesn't have any style and it doesn't validate any data. It just store what I send in the form but it's working. We can add new messages and then go to http://localhost:1337/message/ and check them all. Actually, depending on the browser it can check the email is a valid email address.

### Showing the stored messages

1. Create the HomepageController controller

	```sh
	$ sails generate controller homepage
	```

2. Modify the "config/routes.js"

	Replace these lines. (This code is saying: every time someone hit '/' render the view homepage)
	```js
	'/': {
		view: 'homepage'
	}
	```
	
	With this one. (This code is saying: every time someone hit '/' execute the function index in the HomepageController)
	```js
	'/': 'HomepageController.index'
	```
	
3. Create a the index function in the "api/controllers/HomepageController.js"

	```js
	index: function(req, res, next) {
		console.log("HomepageController  was called");
		res.view('homepage');
	}
	```

If we start the app now, seems that nothing changed but the application now is going through the HomepageController when we hit '/', we can verify that by adding a new message and seeing the console.

4. Modify the "view/homepage.ejs" to see all the stored messages. Add the following HTML code

	```html
	<div id="messages">
		<h1>All my messages</h1>
		<table>
			<th>Name</th>
			<th>Message</th>
			<% _.each(messages, function(message) { %>
			<tr>
				<td><%=message.author%></td>
				<td><%=message.content%></td>
			</tr>
			<%})%>
		</table>
	</div>
	```

5. Now we have to define the **messages** variable, so go to the "api/controllers/HomepageController.js" and modify the index function

	```js
	index: function(req, res, next) {
		console.log("HomepageController  was called");
		Message.find(function messagesFounded(err, messages) {
				if (err) {
					console.log(err);
					return next(err);
				}
				res.view('homepage',
				{
					'messages': messages
				});
			});
		}
	}
	```

6. Start the app and go to http://localhost:1337/. Now you can see all the stored messages and add new messages. 

### Deleting messages

1. Modify the "view/homepage.ejs". Add the following HTML code

	```html
	<div id="messages">
	  <h1>All my messages</h1>
	  <table>
		<th>Name</th>
		<th>Message</th>
		<th>Delete</th>
		<% _.each(messages, function(message) { %>
		  <tr>
			<td><%=message.author%></td>
			<td><%=message.content%></td>
			<td>
			  <form action="/message/destroy/<%=message.id%>" method="post">
				<button type="submit" class="button"/>Delete</button>
			  </form>
			</td>
		  </tr>
		  <%})%>
		</table>
	  </div>
	```

2. Start the app and go to http://localhost:1337/. Now you can see all the stored messages, delete some messages, and add new messages.

### Redirecting to homepage after adding and deleting messages

1. Modify the "api/controllers/MessageController.js". Create two method create and destroy.

	```js
	create: function(req, res){
		console.log("MessageController.create  was called");
		var messagesJSON = {
			author: req.param('author'),
			email: req.param('email'),
			content: req.param('content'),
		}

		Message.create(messagesJSON, function(err, message) {
			if (err) {
				console.log(err);
			}
			return res.redirect('homepage');
		});

	},

	destroy: function  (req, res, next) {
		console.log("MessageController.destroy  was called");
		Message.destroy(req.param('id'), function(err) {
			if(err){
				console.log(err);
			}
			res.redirect('homepage');
		});
	}
	```

Note that **create** and **destroy** are called without defining the routes, as we did with the homepage. That is because sails automatically maps the following URLs

	- 'POST /message' : 'MessageController.create'
	- 'POST /message/destroy/:id' : 'MessageController.destroy'
