# Gifter

## Installation requirements


- [Nodejs](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)

## Technologies used

- Next.js
- Tailwind css
- Formik.js
- ASP.NET
- Domain Driven Design

## Getting started

Copy the repository files or clone the repository with the following command

```git
git clone https://github.com/Waterball12/gifter.git
```

Now you should be able to run the following command to install all the required dependencies

```
yarn install
```

After you've installed the dependencies you can start the local server using

```
yarn dev
```


Waiting till it create a build. Afterwards you'll be able to navigate to http://localhost:3000 to view website running.

## Folder structure

    .
    ├── node_modules            # Ignore editing this directory
    ├── src                     # Source files
    │   ├── styles              # The assets of the projects such as img and css
    │   ├── components          # Contains the components used across the views
    │   ├── templates           # Templates used across the pages 
    │   ├── utils               # Utilities 
    │   ├── layout              # The layout used with the views
    │   └── pages               # The main directory where to edit or create files
    ├── public                  # Public files, containing logo, manifest and anything that should be exposed publicy 
    └── README.md

## Anatomy

A brief anatomy of components used across the project

```jsx
// Essential to use JSX
import React from 'react';
import Image from 'next/image';

// A component can also accept props so you can pass data like this
// <Component title="my Title" />
const Component = (props) => {
    const {
        title
    } = props; // Get the title from the props

    return (
        <div>
            <p>{title}</p>
            <Image src='' />
            // Rest of HTML
        </div>
    );
};

export default Component;
```
