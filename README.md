# Energie Vin API

`Energie Vin API` is an API made to gather data from external APIs to retrieve wines data, create evaluation of wines and create users.

Access to diagram: https://drive.google.com/file/d/123J4krTPCIIdB5sc_Qj2BOp7zi0PrszQ/view?usp=sharing

## Steps for run this project in development

### (local - It must have nodejs installed)

- node version: 18.16.0

1. Run `npm install`
2. Run `docker-compose up`
3. To create a json API server `npm run generateMockedData`
4. Run `npm run dev:server`

# Tests

Whenever you make changes to your application code, run the automated tests to make sure everything is working as expected.

- `npm run test` - Run all tests in silent mode
- `npm run test:ci` - Runs all tests generating a coverage report
- `npm run test:verbose` - Run tests in verbose mode, useful for debugging.

# Endpoints

Energie Vin Endpoints has three modules, Evaluations, Users and Wines.

## Wine module

### Create Wine

#### Request

To create a wine the body request must be as it follows:

`POST /wines`

```JSON
{
    "name": "Domaine du Haut Bourg Sauvignon",
    "property": {
        "origin": "Valleé de la Loire",
        "color": "blanc",
        "year": 2022
    },
    "price": 2,
    "date": "2023-05-21",
    "website": "www.hautbourgsauvignon.com"
}
```

### Bulk Create Wines

##### Request

To create more than one wine, the API conect to a externa source, the data must respect the following structure:

`POST /wines`

```JSON
[{
    "name": "Domaine du Haut Bourg Sauvignon",
    "property": {
        "origin": "Valleé de la Loire",
        "color": "blanc",
        "year": 2022
    },
    "price": 2,
    "date": "2023-05-21",
    "website": "www.hautbourgsauvignon.com"
}]
```

### Get Wine

Get all wine's information

#### Request

`GET /wines/:wineId`

#### Response

```JSON
{
    "wineId": 1,
    "name": "Domaine du Haut Bourg Sauvignon",
    "webSite": "www.hautbourgsauvignon.com",
    "date": "2023-05-21T11:57:47.299Z",
    "properties": {
        "year": "2022",
        "origin": "Valleé de la Loire",
        "color": "blanc"
    }
}
```

### Get Wines

Get all wines informations without properties and prices

#### Request

`GET /wines`

#### Response

```JSON
[
    {
        "id": 1,
        "name": "Domaine du Haut Bourg Sauvignon",
        "website": "www.hautbourgsauvignon.com",
        "date": "2023-05-21T11:57:47.299Z"
    },
    {
        "id": 2,
        "name": "Pascal Bouchard - Le Classique Chablis",
        "website": "www.pascalbouchard.com",
        "date": "2023-05-21T11:57:47.516Z"
    }
]
```

### Get Wines Prices

Get all prices of a wine, the user can limit the prices history, the price is order by most recent

#### Request

`GET /prices/:wineId?limit=2`

#### Response

```JSON
{
    "wine": {
        "wineId": 1,
        "name": "Domaine du Haut Bourg Sauvignon",
        "webSite": "www.hautbourgsauvignon.com",
        "date": "2023-05-21T11:57:47.299Z",
        "properties": {
            "year": "2022",
            "origin": "Valleé de la Loire",
            "color": "blanc"
        }
    },
    "prices": [
        {
            "id": 2,
            "price": "2",
            "date": "2023-05-21T19:20:31.902Z"
        },
        {
            "id": 1,
            "price": "23",
            "date": "2023-05-21T19:18:00.976Z"
        }
    ]
}
```

## User module

### Create User

#### Request

To create a user, the body request must be as it follows:

`POST /users`

```JSON
{
    "name": "Conrado Guerra",
    "specialist": false
}
```

## Evaluation module

### Create Evaluation

#### Request

To create a evalution, to create a evaluation, a wine and a user must exists and the user must be a specialist. The body request must be as it follows:

`POST /evaluations`

```JSON
{
    "userId": 1,
    "wineId": 2,
    "grade": 1
}
```

### Evaluations average

Get all average of wines evaluations and its prices, ordered by the best grades.

#### Request

`GET /evaluations/average`

#### Response

```JSON
[
    {
        "wineId": 1,
        "name": "Domaine du Haut Bourg Sauvignon",
        "website": "www.hautbourgsauvignon.com",
        "averageGrade": 3.5,
        "date": "2023-05-21T11:57:47.299Z",
        "price": 54
    },
    {
        "wineId": 3,
        "name": "Baron La rosé Merlot",
        "website": "www.baronlarosemerlot.com",
        "averageGrade": 2.5,
        "date": "2023-05-21T11:57:47.706Z",
        "price": 4.8
    },
    {
        "wineId": 2,
        "name": "Pascal Bouchard - Le Classique Chablis",
        "website": "www.pascalbouchard.com",
        "averageGrade": 1.5,
        "date": "2023-05-21T11:57:47.516Z",
        "price": 12.99
    }
]
```
