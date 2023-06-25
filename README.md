# AInstructor

## Description

Welcome to AInstructor, the next generation learning platform. Powered by AI, AInstructor helps students to learn their lessons and teachers to manage their students progression.


## Installation

### Requirements

#### Frontend
- NodeJS `v18`
- Npm / Yarn / Pnpm

#### Backend
- Python `v3.11`
- Pipenv
- Sqlite3

### Steps

#### Using Docker
1. Clone the repository
2. Run `docker-compose up`
3. Go to `http://localhost:3000`


#### Frontend
1. Clone the repository
2. Go to the `frontend` folder
3. Run `npm install` or `yarn install` or `pnpm install`
4. Run `npm run dev` or `yarn dev` or `pnpm dev`
5. Go to `http://localhost:3000`


#### Backend
1. Clone the repository
2. Go to the `backend` folder
3. Run `pipenv install`
4. Run `pipenv shell`
5. Run `cd AInstructor`
6. Run `python manage.py makemigrations app`
7. Run `python manage.py migrate`
8. Run `python manage.py runserver`


## Usage

### Create a teacher account
1. Go to `http://localhost:3000/auth/register`
2. Create an account with the `Teacher` role
3. Login with your account
4. Manage your courses and teams

### Create a student account
1. Go to `http://localhost:3000/auth/register`
2. Create an account with the `Student` role
3. Login with your account
4. Ask your teacher to add you to a team
5. Check your courses and lessons
6. Train your skills using ai

## Authors
- Louis Lecouturier
- Antoine Maes
- Mael Monteil
- Nicolas Broage
- Jules Maisonnaves
