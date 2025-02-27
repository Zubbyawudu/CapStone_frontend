# ZUB RENTALS


#SUMMARY OF APPLICATION
 This application is a simple CRUD application that stores the inventory of rental fleet owners which allows them to be able to store their cars and its details , in order to enhance the flexibility of the business . 

## TECHNOLOGIES USED 
* MongoDB
* Express
* React
* Nodejs
* JavaScript
* CSS3


## FEATURES 

* Users are able to create an inventory.
  
* Users are able to read their updated inventory.

* Users are able to update or edit details of their cars in order to keep the information up to date .
  
* Users are able to delete from the inventory after they have their cars out of use .

* Easy to identify and navigate around the website .


## INSTALLATION

The application relys  the following dependencies
* Node.js
* npm or yarn
* MongoDB


## USAGE 

This application provides a RESTful API for managing the fleet for every user with the use of the following endpoints to interact with the app :

#### Add a New Car Listing

* **POST** `/add`
* Request Body:
	+ `make`: string (required)
	+ `model`: string (required)
	+ `year`: number (required)
	+ `price`: number (required)
	+ `mileage`: number (required)
	+ `location`: string (required)
	+ `description`: string (required)
	+ `image`: file (required)
* Response: `201 Created` with the newly created car listing

#### Get All Cars

* **GET** `/`
* Response: `200 OK` with an array of all car listings

#### Get a Single Car by ID

* **GET** `/:id`
* Response: `200 OK` with the car listing with the specified ID, or `404 Not Found` if the car listing does not exist

#### Update a Car Listing (Only Owner Can Update)

* **PUT** `/:id`
* Request Body:
	+ `make`: string (optional)
	+ `model`: string (optional)
	+ `year`: number (optional)
	+ `price`: number (optional)
	+ `mileage`: number (optional)
	+ `location`: string (optional)
	+ `description`: string (optional)
	+ `image`: file (optional)
* Response: `200 OK` with the updated car listing, or `403 Forbidden` if the user is not the owner of the car listing

#### Delete a Car Listing (Only Owner Can Delete)

* **DELETE** `/:id`
* Response: `200 OK` with a message indicating that the car listing has been deleted, or `403 Forbidden` if the user is not the owner of the car listing

## Database Schema

The application uses a MongoDB database with the following schema:

```json
{
"_id": ObjectId,
  "user": ObjectId,
  "make": String,
  "model": String,
  "year": Number,
  "price": Number,
  "mileage": Number,
  "location": String,
  "description": String,
  "image": String
}


##Future updates 
* Users get to receive their payments directly from the website
* Users get to monitor real time location of their cars .



## About developer

As a skilled software engineer with a strong foundation in web development, database management, and problem-solving, I thrive on creating efficient and innovative solutions. My technical expertise spans front-end and back-end development, with proficiency in technologies like HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB. I bring a strong understanding of object-oriented programming, data structures, and version control, coupled with hands-on experience in optimizing code and debugging.

Thank you and Enjoy the Application !













