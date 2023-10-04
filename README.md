# Hangout | Event Management App

Hangout is an event management application developed using React for the front-end and Node.js for the server-side infrastructure. It facilitates the planning and organization of events, providing users with a seamless experience for creating, managing, and attending various types of gatherings.

## Setups

### Development

Before running the application, it's essential to set up certain environment variables for authentication, as the authentication process is integrated with Clerk. For more detailed instructions, please refer to the [Clerk documentation](https://clerk.com/docs?utm_source=www.google.com&utm_medium=referral&utm_campaign=none).

`.env`:
- Server
    - DATABASE_URL: database url
    - CLERK_WEBHOOK_SECRET_KEY: clerk secret key
- Client
    - VITE_CLERK_PUBLISHABLE_KEY: clerk pulshishable key

To work with [prisma](https://www.prisma.io/docs/getting-started/quickstart), you can use `npm run db:migrate` to migrate the database to interact with the database.

To run the client-side of the application, execute `npm run dev` within the `client` directory. To start the server, navigate to the `server` folder and run `npm run start:dev`. This setup allows for the convenient development and testing of both the front-end and server components of the Hangout application.