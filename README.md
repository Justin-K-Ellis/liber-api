# Liber-API

## About

Liber-API is a web service that allows a client application to perform CRUD operations on
a product database via a JSON REST API. It is implemented in Node.js with the Express.js
framework.

### Tech Stack

- Node.js (runtime)
- Express.js (API framework)
- PostgresSQL (RDBMS database)
- node-postgres (Node.js PostgreSQL driver)
- Docker (for development and deployment)

## Installation and Running

This repo includes both a Dockerfile and a Docker compose file (`compose.yaml`). We
recommend installing and running this project with Docker. Download Docker Desktop [here](https://www.docker.com/ "Docker Official Site")
if you don't have it installed already.

`compose.yaml` references both the Dockerfile for this project's API and the official
PostgreSQL Docker image. To get the project up and running, first create a `password.txt`
file in `/db`. The file should include the password only in plain text. It's recommended
to include the path to this file in the project's `.gitignore`.

After you've created the required `password.txt` file, run `docker compose up --build`
from the project root. The API should then be available from port 3000. The process can be
stopped anytime with CTRL + C.

Once the API is running, you can run the database table script by sending a GET request to
`/init/db`.

## Routes

This API communicates with a single `product` table in the database, allowing CRUD operations
to be performed. All routes fall under the `/api` route.

### Create a Product

Products can be created by sending a POST request to `/product` with an appropriate JSON request
body. The request body requires:

- "productId" (number)
- "productName" (string)
- "price" (number)

Example:

```
POST /api/product

{
    "productId": 12345,
    "productName": "White T-shirt",
    "price": 1500
}
```

A successful request will return status 201 and a representation of the created resource.
A request with an invalid body will recieve a response with status 400.

### Get all Products

An array of all products can fetched by sending a GET request to `/product`.

Example:

```
GET  /api/product
```

This returns a JSON response like:

```json
[
  {
    "product_id": "12345",
    "product_name": "Java Actual Machine Coffee Maker",
    "price": 9000
  },
  {
    "product_id": "67890",
    "product_name": "Blue baby ball",
    "price": 400
  }
]
```

### Search for Products

#### By Price Range

Clients can search for products in a set price range by sending a GET request to `/product/search` with the appropriate
query parameters. Requests require both a `min` parameter and a `max` parameter to fix the
price search range.

Example:
`GET /api/product/search?min=300&max=400`

A successfull request will return a response with status 200 and a body like:

```json
[
  {
    "product_id": "67890",
    "product_name": "Blue baby ball",
    "price": 400
  },
  {
    "product_id": "111",
    "product_name": "Three Pencils",
    "price": 333
  }
]
```

Requests without both search parameters or malformed parameters recieve a response with
status 400.

#### By Text Search

Users can also search for products by name, with the API accepting partial text matches.
The client can perform this search by sending a GET request to `/product/search` with a
`productName` query parameter. Search is case insensitive.
A successful request will return a response with status 200 and an array of products.

Example:
`GET /api/product/search?productName=java`

Returns:

```json
[
  {
    "product_id": "12345",
    "product_name": "Java Actual Machine Coffee Maker",
    "price": 9000
  }
]
```

Requests without both search parameters or malformed parameters recieve a response with
status 400.

#### Update a Product

Users can also update the name and price of a particular product by product id by sending
a PUT request to `/product/:productId`. This router requires a `productId` path parameter
and `productName` and `price` fields in the request body.

Example:

```
PUT /api/product/1234

{
    "productName": "White and blue T-shirt",
    "price": 2000
}

```

A successful request will return status 200 with a representation of the updated resource.
A request with a missing `productName` parameter, or a missing or malformed `price` parameter
will recieve a response with status 400. Attempting to update a product that does not exist
will result in a response with status 404.

#### Delete a Product

Users can also delete an existing product by `productId` with a DELETE request to `/product/:productId`.

Example:

`DELETE /api/product/1234`

A successful delete request will recieve a response with status 204. Attempting to delete a
resource that does not exist will result in status 404.
