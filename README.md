# A Project helps Get Github Repos

In this project, you can:

1. Find repos of specific user.
1. Get basic data of the repo.
1. Search users with user name.

## Features

### Fully Supported RWD

Breakpoints are set to offer appropriate user experience for users using any device.

### Mode Switch

Click on the Moon button to switch from dark/light mode.

### Infinite Scroll

Fetch 10 data per time, when the user scroll to the bottom.\
When already got all the data, stop sending request.

### Search User with Username

Type into the search field, press `enter` / click on search icon to search.

Infinite Scroll is supported here, too.

### Error Handling

* Wrong Page Route
Return NotFound Page.

* Not Authenticated
Return Error403 Page with instruction on the page.

* User Not Found
Return Error with the status code(404) and details.

* Search with Zero Result
Show details.

* Other
Return Error with the status code and the error message.

## Getting Started

Follow the following steps to build up the necessary environment and run the app.

### add *Your Github Token*

**Note: If not doing so, you may encounter a `403` error.**

Add *Your Github Token* in `.env` file at the root of the project.\
You can refer to `.env.example` file.

[How to generate Github Token?](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

### `npm install`

Run this script to install necessary node_modules automatically.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.