//jshint esversion:6

const express = require("express"); // import the Express module
const bodyParser = require("body-parser"); // import the body-parser module
const ejs = require("ejs"); // import the ejs module
const _ = require('lodash'); // import lodash module

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express(); // initialize our Express app

let posts = []; // empty array for the posts (global variable)

app.set('view engine', 'ejs'); // this line sets our view engine for our EJS templates, necessary in order to use EJS

app.use(bodyParser.urlencoded({extended: true})); // this line allow us to use body-parser in the app
app.use(express.static("public")); // tells our server that our static files to be served to client are in the file named public

app.get("/",function(req, res){ // home route

  res.render("home", {startingContent:homeStartingContent, posts: posts}); // render the homepage and pass contents for the page
});

app.get("/about", function(req,res){ // route for the about page

  res.render("about", {aboutContent : aboutContent}); // render the about page and pass contents for the page
});

app.get("/contact", function(req,res){ // route for the contact page

  res.render("contact", {contactContent:contactContent}); // render the contact page and pass contents for the page

});

app.get("/compose", function(req, res){ // route for the compose page

  res.render("compose"); // render the compose page
});


app.post("/compose", function(req,res){ // post method for the route compose

  const  post = { // initializing a  "post" object, using the values passed from the form in the compose page
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post); // inserts newly created post into the posts array

  res.redirect("/"); // redirects to the home page

});



app.get("/posts/:postName",function(req,res){

  const requestedTitle =  _.lowerCase(req.params.postName); // converts into lowercase the post title entered by the user in the URL


  posts.forEach(function(post){// loops through the posts array

    const storedTitle = _.lowerCase(post.title) ; // converts into lowercase the title stored inside the array
    const storedContent = post.content ; // taps into the content of the post

    if(requestedTitle === storedTitle){
      res.render("post", {title:post.title , content:storedContent}); // pass the original titile and the content for rendering
    }
  });

});






app.listen(3000, function() { // connects the app to the HTTP port 3000
  console.log("Server started on port 3000");
});
