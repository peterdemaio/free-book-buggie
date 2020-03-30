![MIT LICENSE](https://img.shields.io/github/license/scottbromander/the_marketplace.svg?style=flat-square)
![REPO SIZE](https://img.shields.io/github/repo-size/scottbromander/the_marketplace.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/scottbromander/the_marketplace.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/scottbromander/the_marketplace.svg?style=social)


# The Free Book Buggie

## Description

_Duration: 2 week sprint_

The Free Book Buggie is a website made for the Free Book Buggie Non-Profit Organization, an organization based out of the Twin Cities of Minnesota that collects used children’s books before they end up in landfills and distributes them to underserved communities. 

The purpose of the website is to record data on the organization’s collecting and distribution of books and children served. Combined with demographics information of the children, this data can then be presented in many ways to facilitate the solicitation of donations or assist in grant writing.

To see the fully functional site, please visit: (INSERT DEPLOYED VERSION HERE)

## Screen Shot

(Insert two screen shots here)

## Installation

Before getting started, make sure you have the following software installed on your computer:
[Node.js](https://nodejs.org/en/)
[PostgreSQL](https://www.postgresql.org/)
[Nodemon](https://nodemon.io/)
Create a new database named `free_book_buggie`
Run the queries that are stored in the `database.sql` file to populate the tables and insert the values you’ll need. The project is built on [Postgres](https://www.postgresql.org/download/) so you will need to make sure to have that installed. [Postico](https://eggerapps.at/postico/) is recommended for running the queries.
In your terminal navigate to this project and `run npm install` to install all of the necessary dependencies.
Run `npm run server` to start the server
Run `npm run client` to start the server and open a new browser window.

## Usage 

Login to begin (the default username and password for development is:
username: admin
password: admin
To register a new user, click on register volunteer. Note, this does not log the current registered user out, this simply creates a new user. The idea of this is the admin should be the only person with the ability to register new users to the app. This is to ensure only trusted volunteers of the Free Book Buggie have access to the data.
User clicks on Organizations List or Contacts List to see all of the Organizations and Contacts the Free Book Buggie has in its database. These contact cards can be edited by clicking on the text. 
User clicks on “add new org” to create new organization, entering address and demographics information. 
User clicks on “add new event” to create a new event for the future. For future events the fields of “books collected”, “books distributed” and “number of children” can be left blank. If the user has an event that wasn’t made ahead of time users can enter in the values of those fields. 
The mobile recording button on the home screen allows a volunteer to record the number of books collected, distributed and number of kids served for an already created event. 

## Built With
	Material-UI, Axios, Chart.js, Express, PG, React.js, and Redux.

## Acknowledgement
Thanks to Prime Digital Academy for their support during the project, and The Free Book Buggie for their work and inspiration. 

## Support
	You can reach out to the four developers of this project with any questions:
	-	Peter DeMaio: pedemaio@gmail.com
	- 	Nic Payne: nicpaynedev@gmail.com
	- 	Russel Kerber: russell.kerber@gmail.com
	- 	Andy McElligott: andymc2315@gmail.com
