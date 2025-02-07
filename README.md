# urlshortener

**Project Description**: 
Like the title suggests, this api shortens long URLs and its main features are short-links with a custom domain and tracking the number of clicks per links.

## Pre-requisites

To be able to run the code you need some tooling installed first:

- Node.js - https://nodejs.org/
- docker - https://docs.docker.com/get-docker/

To install the dependencies run “npm install” or “yarn install” in your terminal.

To test the app you need an API Client like:

- Postman - https://www.postman.com/downloads/
- Insomnia - https://insomnia.rest/download

## Usage

- user sign-up: send a POST request to localhost:3001/user/signup and provide an object with "firstname", "lastname", "email", and "password" properties.
- user sign-in: send a POST request to localhost:3001/auth/signin and provide an object with your "email" and "password" properties.
- shorten url: send a POST request to localhost:3001/url/shortenUrl provide your access_token and an object with a "longUrl" field with your URL. 
- user dashboard: send a GET request to localhost:3001/user/dashboard and provide your acces_token
- user profile: send a GET request to localhost:3001/user/profile and provide your acces_token
- user update profile: send a POST request to localhost:3001/user/update and provide your acces_token with an object with either "firstame", "lastname", "email" and "password" properties or all if you want to change all of them.
- user upgrade subscription plan: send a POST request to localhost:3001/user/upgrade and provide your acces_token with an object with a "newPlan" propertie set to “Intermediate” or “Premium” plan since by default every user is on a free subscription plan.
- see all the subscription plans: send a GET request to localhost:3001/subscription.

**Interpretation**: 

When using the app:
- if you provide a fake URL meaning a URL that doesn’t direct to a web page, you will receive an error message saying that you provided an invalid URL
- if your email is already in the database you will receive a message saying that the email is already in use
- the subscription plan has only three options: “Free”, “Intermediate” and “Premium”; if you provide a plan other than these, you will receive an error message. 
