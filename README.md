# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/IrinaOsp/nodejs2023Q2-service.git
```

## Switch to develop branch

```
git checkout develop
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default, but you can create .env file and set the desired port as PORT=6000) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Endpoints

### Users

- GET /user: Get all users.
- GET /user/:id: Get a single user by ID.
- POST /user: Create a new user.
- PUT /user/:id: Update a user's password.
- DELETE /user/:id: Delete a user.

### Tracks

- GET /track: Get all tracks.
- GET /track/:id: Get a single track by ID.
- POST /track: Create a new track.
- PUT /track/:id: Update a track.
- DELETE /track/:id: Delete a track.

### Artists

- GET /artist: Get all artists.
- GET /artist/:id: Get a single artist by ID.
- POST /artist: Create a new artist.
- PUT /artist/:id: Update an artist.
- DELETE /artist/:id: Delete an artist.

### Albums

- GET /album: Get all albums.
- GET /album/:id: Get a single album by ID.
- POST /album: Create a new album.
- PUT /album/:id: Update an album.
- DELETE /album/:id: Delete an album.

### Favorites

- GET /favs: Get all favorites.
- POST /favs/track/:id: Add a track to favorites.
- DELETE /favs/track/:id: Remove a track from favorites.
- POST /favs/album/:id: Add an album to favorites.
- DELETE /favs/album/:id: Remove an album from favorites.
- POST /favs/artist/:id: Add an artist to favorites.
- DELETE /favs/artist/:id: Remove an artist from favorites.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
