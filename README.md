# QuizApp

## **Workflow**

![image](https://user-images.githubusercontent.com/43498814/132635233-de068093-f4d4-4de7-bf21-430f6c37efef.png)

Activity workflow

![image](https://user-images.githubusercontent.com/43498814/132635520-0a3fee8e-7aaf-4c2f-bcf2-789fa93184e1.png)

Schema Design

![image](https://user-images.githubusercontent.com/43498814/132639744-ea00d808-6f6d-4fcc-9327-c21930fa70f5.png)

## **Features**

1. Sign up - To register a new user (Admin rights will be given from backend)
2. Login - To sign in (for registered users only)
3. Create , Edit , Delete Quiz - Can be done by Admin
4. Attempt Quiz - Can be done by User as well as Admin
5. Leaderboard - Ranking of users according to their total scores
6. Quiz-wise Leaderboard - Ranking of users who have attempted the respective quiz
7. My quizzes - List of all Quiz attempted by the user with the scores
8. My Profile - Displays details of logged in user

## **Technology stack used**

1. React - Frontend
2. NodeJs and MongoDB - Backend

## **Libraries used**

## **Frontend**

1. Material UI - Design
2. React-Toastisfy - For alert messages

## **Backend**

1. jsonwebtoken - For managing the JSON Web Tokens
2. bcryptjs - For hashing and managing the users password
3. multer - For handling images sent to the server
4. express-helps in fast-tracking development of server-based applications
5. mongoose-provides a straight-forward, schema-based solution to model your
   application data
6. morgan-It is a Node. js and Express middleware to log HTTP requests and errors,
   and simplifies the process
7. bodyparser- It is responsible for parsing the incoming request bodies in a
   middleware before you handle it
8. nodemon - This is a development dependency for providing hot reload for
   the server running on your machine.

## Setup

Clone git repo:

```bash
git clone https://github.com/fruxc/QuizApp.git
```

To start application

```bash
npm run heroku-postbuild
```

```bash
npm install
```

```bash
npm start
```
open your browser to <http://localhost:5000>

## More Information
1. To know more about Backend refer [QuizApp_backend_README.pdf](https://github.com/Mitali-Ranawat/QuizApp/files/7136058/QuizApp_backend_README.pdf)
2. To know more about API refer [QuizApp-API.pdf](https://github.com/Mitali-Ranawat/QuizApp/files/7136067/QuizApp-API.pdf)



