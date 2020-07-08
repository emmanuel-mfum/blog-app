# blog-app
Prototype for diary/blog app

The goal of this project for me was to practice my understanding and use of EJS templates and the setup of a Node server. 

This app is a prototype and doesn't have any meaningful content. Once the app is run, the user can reach a page called "Compose",
using the route "/compose" where he can write a title and content of an entry. Once the "Publish" button is clicked, the data inputed
by the user is then used to initialize a "post" object, which has two attributes, a title (post.title) and some content (post.content).

The new object is then pushed into an array of objects that will be displayed on the homepage of the blog ("/home") using a forEach method.

The suer can also reach an individual full-page dedicated to one entry in particular using the route "/posts/:postName", where postName is a
parameter entered by the user. The server will check if there is any post by that name and if yes, will render the page of this blog post.

Each post on the homepage also has "Read More" feature that points towards the route described above. Posts displayed on the homepage are truncated
to 100 characters.

There is also an about page and contact page, but they only have some "Lorem ipsum" on it.
