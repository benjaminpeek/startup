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

[Mom's Kitchen - CSS](https://startup.benjaminpeek.com)

For this deliverable, I added CSS to my HTML-only website to give it a lot more character and visual appeal!

-**Header, footer, and main content body** Added a logo and stylized the navigation links. Adjusted the header to use Flexbox.

-**Navigation elements** Added a working navigation bar and styled it with CSS rules and Flexbox.

-**Responsive to window resizing** The page scales with the viewport to keep everything on the screen in a flexible way.

-**Application elements** I have a login form, a profile page, an explore page, and an about page.

-**Application text content** I have text content that includes an intro on the Homepage, recipe details in the Profile section, recipe descriptions in the Explore page, and an About section explaining the site.

-**Application images** I have pictures for the recipes and on the homepage.

## JavaScript Deliverable

[Mom's Kitchen - CSS](https://startup.benjaminpeek.com)

For this deliverable, I added functionality to my website with JavaScript!
-**Login Support** Added some functionality to the login form on the homepage of my website, takes user to their profile and remembers their name in local storage.
-**Database Support** Users will be able to store their own recipes on their Profile, and look at other cooks and their recipes. For now, these are done with localStorage through JavaScript, like adding more recipes to your profile.
-**WebSocket Support**
-**Interaction Logic** Made it so the user's Profile page welcomes them back by their first name and does not display their profile features until they have logged in locally on the Home page. Added the ability to add multiple ingredients to recipe and submit an image of it.