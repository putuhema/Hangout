# Hangout | Event Management App

## setup the app

- This app uses `json-server` as a backend, so you need to create `db.json` file inside the `api` folder. Create `api` folder at the root of the project with the following content:

```json
// ./api/db.json
{
    "events": []
}
```

- authentication is achieved using `clerk`. Please paste your API key to the `.env`. see [documentation](https://clerk.com/docs/quickstarts/react#configure-clerk-provider) for more details.

## run the app

- Install the necessary package by running:

```bash
npm install
```

- Start server with the following command:

```bash
npm run db-watch
```

- Finally, run the app in development mode using:

```bash
npm run dev
```
