# `NhutBnB`

[NhutBnB](https://nhut-airbnb-api.herokuapp.com/) is a webpage inspired by [airbnb](https://www.airbnb.com/).
NhutBnB allow for creating/delete/updating listing, and creating/delete reviews.

## Contacts

[![LinkedIn][linkedin-shield]][linkedin-url]

## Tech Stack

### Frameworks, Platforms, and Libararies:

![Javascript](https://img.shields.io/badge/Javascript%20-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![REACT](https://img.shields.io/badge/REACT%20-61DAFB?style=for-the-badge&logo=REACT&logoColor=white)
![EXPRESS](https://img.shields.io/badge/Express%20-000000?style=for-the-badge&logo=REACT&logoColor=white)
![REDUX](https://img.shields.io/badge/Redux%20-764ABC?style=for-the-badge&logo=Redux&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.Js%20-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white)

### Database and Host:

![Postgresql](https://img.shields.io/badge/Postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![HEROKU](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=Heroku&logoColor=white)

## Installation

- Clone the Repo

```sh
git clone https://github.com/NhutLinh-Ngo/API-Project.git
```

- Create .env file.

```sh
 cp .env.example .env
```

- Install NPM packages

```sh
npm install
```

- Run the following code to in the backend/ folder to create database.

```sh
npx dotenv sequelize db:migrate
```

```sh
npx dotenv sequelize db:seed:all
```

- cd into frontend and backend/src folders(both must be running).

```sh
npm start
```

## Wiki Links

- [Backend Routes (API Documentation)](https://github.com/NhutLinh-Ngo/API-Project/wiki/API-Documentation)
- [Database Schema](https://github.com/NhutLinh-Ngo/API-Project/wiki/Database-Schema)
- [Feature List](https://github.com/NhutLinh-Ngo/API-Project/wiki/Feature-List)
- [Redux Store Shape](https://github.com/NhutLinh-Ngo/API-Project/wiki/Redux-State-Shape)

## Future Features

- Implement review update.
- Implement full CRUD for bookings.
- Implement Search bar.
- Implement Google API to display spot location.

## Functionality Demo

- Login/signup.

![img](https://i.imgur.com/78hOSdp.gif)

- Post a listing.

![img2](https://imgur.com/fsJjjCJ.gif)

- Create a new Review for a listing.

![img3](https://imgur.com/RKof5g0.gif)

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/nhut-linh-ngo/
