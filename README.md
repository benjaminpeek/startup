# startup: Mom's Kitchen

This is my repository for the Startup Application project in CS 260

## Notes

Here is a link to my [**Notes**](notes.md) for this course.

# Startup Specification

## Elevator Pitch

For my startup, I am going to design a Family Recipe Sharing Website called Mom's Kitchen. I have had this idea for a little while, because I always think about how much I love my mom's cooking. I think that recipes hold a lot of sentimental value within families, and families are very highly valued in Utah, so I think it would be a great application for many people I know. In Mom's Kitchen, you'll be able to record your own family recipes and share them with the world! (if you want to) You will also be able to see other people's familiy recipes and be able to explore new recipes. You can find home cooks you like and favorite their recipes so you can try them out for your own family!

## Key Features

Some key features of the website will be:

- Logging in to record your own family recipes and save new ones
- Finding other home cooks and viewing their family recipes
- See what other people have to say about your own and other's family recipes in a ranking system

## Class Technologies

Here is how each class technology will be used in Mom's Kitchen:

### Authentication

Authentication will be used for people coming to the site who want to create their own account so they can utilize features such as recording their own familiy recipes, saving family recipes from other users, and ranking recipes.

### Database Data

Mom's Kitchen will have a ranking of the most popular family recipes for that week! It will give users a chance to try something new that they already know has been tested and enjoyed by other users.

### WebSocket Data

This will be used in the ranking system for recipes. Users will be able to send in their own rankings for family recipes posted publically to the site, and other users will be able to see those reviews.

## Design Image:

Here is a sketchup of how Mom's Kitchen will look to the users:
![Drawing of a mockup of what the Mom's Kitchen website would look like. Drawn on a notepad with pen.](https://github.com/benjaminpeek/startup/assets/52461753/1a1e1e24-1abb-44fc-90b8-4b1616714f60)

## HTML Deliverable

[Mom's Kitchen](https://startup.benjaminpeek.com)

For this deliverable, I made an HTML-only version of my application.

- **HTML Pages** For this version, I have 4 HTML pages: Home, Profile, Explore, and About. These pages will allow the user to interact with all the functionality of the website.
- **Links** Every page links to each other through the navigation links in the header section of the HTML. There you can find links to Home, Profile, Explore, and About.
- **Textual Content** Every recipe and cook is represented with text. Also, all the class technologies are currrently represented mainly with
  text. Additionally, the About section is filled in with text.
- **Placeholders for 3rd Party Service Calls** Two of these are on the Home page, in the login form, where the user has the option to sign in using their credentials on the website or using their Google account.
- **Applicatoin Images** I used two images, one for the home page and another for the about page.
- **Login Placeholder** On the Home page, there is a placeholder for a login form.
- **Database Data Placeholder** On the Profile page, there is a placeholder for database data in the recipe sections
- **WebSocket Data Placeholder** On the Explore page, added the placeholders for information on most popular recipes and home cooks.

## CSS Deliverable

[Mom's Kitchen](https://startup.benjaminpeek.com)

For this deliverable, I added CSS to my HTML-only website to give it a lot more character and visual appeal!

-**Header, footer, and main content body** Added a logo and stylized the navigation links. Adjusted the header to use Flexbox.

-**Navigation elements** Added a working navigation bar and styled it with CSS rules and Flexbox.

-**Responsive to window resizing** The page scales with the viewport to keep everything on the screen in a flexible way.

-**Application elements** I have a login form, a profile page, an explore page, and an about page.

-**Application text content** I have text content that includes an intro on the Homepage, recipe details in the Profile section, recipe descriptions in the Explore page, and an About section explaining the site.

-**Application images** I have pictures for the recipes and on the homepage.

## JavaScript Deliverable

[Mom's Kitchen](https://startup.benjaminpeek.com)

For this deliverable, I added functionality to my website with JavaScript!
-**Login Support** Added some functionality to the login form on the homepage of my website, takes user to their profile and remembers their name in local storage.

-**Database Support** Users will be able to store their own recipes on their Profile, and look at other cooks and their recipes. For now, these are done with localStorage in JavaScript, like adding more recipes to your profile.

-**WebSocket Support** The user will be able to see popular recipes from the internet in the "Popular Recipes This Week" section using a recipe API on the Explore page.

-**Interaction Logic** Made it so the user's Profile page welcomes them back by their first name and does not display their profile features until they have logged in locally on the Home page. Added the ability to add multiple ingredients to recipe and submit an image of it. Added the ability to create a new recipe and add it to the user's Profile. The user is able to successfully add recipes to their list on their Profile, but right now it gets deleted because we are not yet using a Database to hold the recipes the user creates.

## Service Deliverable

[Mom's Kitchen](https://startup.benjaminpeek.com)

For this deliverable, I added WebSerive support to my website with Node.js and Express.
-**HTTP Service with Node.js and Express** Installed Node.js and Express on my startup, then used them to implement services as described in the Simon Service. I used both Node and Express to create my own HTTP services and call on third party web services.

-**Frontend served up with express static middleware** My files for the frontend are indeed served up with Express static middleware, my main page is just index.js and the rest is in the public directory.

-**Third party service endpoints** On the Profile page, I call on the Spoonacular API to get 4 random recipes from their databse, and display them to the user of my site. I use the recipe's name, image, and ingredients and display them on the page.

-**Provided backend service endpoints** Made a SubmitRecipe backend service endpiont for users who want to post a recipe to their own collection of recipes stored on my site.

-**Frontend calling service endpoints** Made a GetRecipes frontend service endpoint for users who want to get recipes from my site.

## Database Deliverable

[Mom's Kitchen](https://startup.benjaminpeek.com)

-**MongoDB Atlas database created** I made my MongoDB database following the tutorial on GitHub and Canvas! I submitted the hostname on the Canvas Data services assignment.

-**Provides backend endpoints for manipulating application data** Made it so the user's recipes were uploaded to the database and then displayed on their Profile page, calling from the database.

-**Stores application data in MongoDB** Made it so things I was storing in Local Storage are now being stored in the database, and the application's recipes are being stored and displayed from there as well.

## Login Deliverable

[Mom's Kitchen](https://startup.benjaminpeek.com)

-**Supports new user registration** The user is able to create their own account using their email address, desired name, and password.

-**Supports existing user authentication** Users who have already created their account are able to log back in after signing up and see their own recipes and recipes from the web.

-**Stores and retrieves credentials in MongoDB**  All of the information for the user's authentication and saved recipes are stored in MongoDB.

-**Restricts application functionality based upon authentication** The user is not able to add recipes to their Profile page until they have been authenticated. They also must make an account to be able to go to the Explore page and see recipes from the web.

## WebSocket Deliverable

[Mom's Kitchen](https://startup.benjaminpeek.com)

-**Backend listens for WebSocket connection** Set up backend following the Simon logic and tutorial to set up my backend WebSocket connections with peer proxy.

-**Frontend makes WebSocket connection** The frontend configures the WebSocket connection in login.js, profile.js, explore.js, and about.js where I use the socket to send and receive data.

-**Data sent over WebSocket connection** Data is sent over the connection when users connect and disconnect from the website, tracking how many users are currently on the site.

-**WebSocket data displayed in the application interface** On the home page, above the login form, it says how many users are currently on the site, information that is gained by sending and receiving data through the WebSocket.

## React Deliverable

[Mom's Kitchen](https://startup.benjaminpeek.com)

-**Bundled using WebPack and Babel as generated from using create-react-app** Installed React and formatted my directories to be in the format the Vite expects, bundled together correctly.

-**Multiple functional react components**

-**React router** Implemented the React router so the application knows which page the user wants to view. Followed the instruction in my code to use React router to call upon the different webpage functions when the user clicks on them in the nav bar.

-**React hooks**