##Poller

####1. Install NodeJS dependencies
Run `npm install`.

####2. Install Bower components
Navigate to `public/` and run `bower install`.

####3. Set endpoints and credentials
Set your login and polling URIs. Don't forget to set the login credentials as well, if needed. This can be done within `controllers/poller.js`.

####4. Start server
Start NodeJS server: `node server.js`.

####5. Happy polling!
Browse to `http://localhost:3000`. The server runs by default on port `3000`.
