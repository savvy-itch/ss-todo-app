# Todo App
## Description
A simple todo app with data fetching and CRUD functionalities. The app uses [JSONPlaceholder](https://jsonplaceholder.typicode.com) to fetch todos. The API does not allow making changes therefore all creation/deletion requests are faked. To mock changes persistance, local storage has been utilized.

You can try live version [here](#).
## Tech Stack
- React
- Vite
- Redux/RTK
- TypeScript
- Tailwind CSS
- shadcn/ui
## Get Started
To get started with this project, first clone the repo, then install dependencies by running:
```
npm install
```
To run the app on the development server, run:
```
npm run dev
```
## Features
- Todos fetching from an API;
- Dynamic pagination (creating/deletion of task affect the amount of pages);
- CRUD functionality (creating/deletion/editing operations are persisted)
- The app is fully responsive and works well on desktop and mobile screens.