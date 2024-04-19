{
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "e2e": "start-server-and-test dev http://localhost:3000 \"cypress open --e2e --browser electron\"",
    "e2e:headless": "start-server-and-test dev http://localhost:3000 \"cypress run --e2e\"",
    "component": "cypress open --component",
    "component:headless": "cypress run --component",
    "lint": "next lint"
  }
}
