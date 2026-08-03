# HexaSecure Deployment

## Recommended Host

Use Render for this project because HexaSecure has a Node.js backend (`server.js`), not only static HTML.

## Steps

1. Create a GitHub account if you do not have one.
2. Create a new GitHub repository.
3. Upload this whole project folder to GitHub.
4. Go to https://render.com and create an account.
5. Choose New > Web Service.
6. Connect your GitHub repository.
7. Use these settings:

```text
Root Directory: outputs
Build Command: npm install
Start Command: npm start
```

8. Add these environment variables in Render:

```text
ADMIN_EMAIL=admin@hexasecure.com
ADMIN_PASSWORD=choose-a-strong-password
ADMIN_TOKEN=choose-a-long-random-secret
```

9. Click Deploy.

Render will give you a public URL like:

```text
https://hexasecure.onrender.com
```

## Important Note About Data

The current backend stores contact messages and service requests in JSON files inside `data/`.
This is good for a student demo, but for real production hosting you should use a real database
such as PostgreSQL, MongoDB, or another hosted database service.
