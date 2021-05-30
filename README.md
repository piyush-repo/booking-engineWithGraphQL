### Booking-Engine GraphQL Service

A Booking engine GraphQl Service

#### Prerequisites

Node.js version 8 or later version. Confirm by running node -v
#### Clone it

```
git clone https://github.com/piyush-repo/booking-engineWithGraphQL.git
```

#### Install packages

```
npm install
```
#### Run the service on local environment

```
npm run start
```
The service should start on port 3000.
### Open GraphiQL

Open a browser and type http://localhost:3000/graphql. Please find the Schema structure in the Documentation explorer section. 

#### Queries to fetch 


```
query customer{
  Customer {
    CustomerName
    CustomerEmail
    CustomerPhoneNumber
  }
}

query vechile{
  Vechile {
    Vin
    Make
    Model
  }
}

query booking{
  Booking(){
    bookingId
    bookingHrs
    bookingDate,
    customer{
      CustomerName
      CustomerEmail
      CustomerPhoneNumber
    }
    vechile{
      Vin
      Make
      Model
    }
  }
}
```

#### Mutation queries
For booking date please do provide date in 'YYYY-MM-DD HH:MM:SS' format and vechile VIN as 17 length of characters. Please refer below example.

```
mutation {
  createBooking(
    input:[{
    customer :{
        CustomerName: "John1",
        CustomerEmail: "john1@gmail.com",
        CustomerPhoneNumber: 1344455
      },
    vechile:{
        Vin: "12345123451234523",
        Make: "BMW",
        Model: "Coupe, Convertible"
    },
    bookingDate:"2021-05-31 11:00:00"
    },{
    customer :{
        CustomerName: "John2",
        CustomerEmail: "john2@gmail.com",
        CustomerPhoneNumber: 13444556
      },
    vechile:{
      Vin: "42345123451234523",
      Make: "Audi",
      Model: "Wagon, Sedan"
    },
    bookingDate:"2021-05-31 13:00:00"
    }]){
    bookingDate
    bookingHrs
    bookingId
    customer{
      CustomerName
      CustomerEmail
    }
    vechile{
      Vin
      Make
    }
  }
}
````

As of now we have seeded some mock data for customer, vechile and booking. Please refer mockData folder for more details.

#### Running app in a container.

Make sure you have installed docker on your machine. Then follow the below steps to run the containerized version.

##### Build an image out of Dockerfile

````
docker build -t booking-engine .
````

##### Run container out of the image.

````
docker run -d -p 3000:3000 booking-engine

Run in detach mode.
`````

Open a browser and paste http://localhost:3000/graphql


