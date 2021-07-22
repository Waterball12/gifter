# How I made gifter

## Table of contents

- [Technologies used](#technologies-used)
- [Development](#deployment)
- [Deployment](#deployment)


I was coding my Discord Bot when I had the idea of creating a website that allow to share gift links in which users can open the gift. I knew that I did not want a full login system because I wanted the user to just create a share link on the fly instead of having to register on the website. Another required that I gave myself was to use next.js because I wanted to expand my knowledge on React.

## Technologies used

I have used next.js for the frontend and ASP.NET Web API for the backend. It was relatively easy to set up the project using both framework and adjust the settings for my needs. I have used a boilerplate for next.js so that I already had most of the settings configured and I only had to add my pages etc. ASP.NET on the other hand was play and plug, I only had to create the project and I was ready to code the API logic. JWT was used to authenticate the user into the system, it was the first time I used it without a database.

## Development

The development of frontend and backend was smooth because I already had some experience using both frameworks, the only new thing that I had to learn was about JWT and authentication. I opted for temporary user login for the web API because I did not want to deal with user information’s, instead I opted for the short-lived token. I spent less time in the frontend because I used tailwind CSS which allowed me to quickly create UI. I only used my desktop to test the app and therefore I did not take much time to test it on mobile.

## Deployment

The deployment was the most challenging part because I had to do a lot of configurations and I got a lot of errors when I deployed my app. For instance, I used a monorepo which contained both frontend and backend; when I tried to the frontend it was alright, I only got 1 error and straight away fixed, the only issue was about the long waiting time for the Digitalocean to build and ship the app. When I deployed the backend the nightmare started, I quickly realised that ASP.NET is not natively supported by App Platform and therefore I had to use Docker, which was fine because Visual Studio 2019 can automatically generate a file for you. The issue that I had was about Digitalocean App platform not picking the right docker context and therefore it could not find the files specified in the dockerfile, to solve this issue I just separated the repositories and move the Dockerfile to the root.
