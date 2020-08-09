# sglg-communications

## About

sglg-communications is a colorful component which provides element `Chat` in which a user can query COVID-19 facts. It is a submission to the [Auth0 hackathon 2020](https://auth0.devpost.com/rules)

<img width="626" alt="sglg-communications demo" src="https://user-images.githubusercontent.com/32281133/89730042-08b9e380-d9f0-11ea-92b7-50ae5bf72e69.png">

## How it works

This components can be imported into a React project to provide functionality for users to communiate with an API (for example COVID-19 facts) via natrual language chat interactions

## Tech stack used

1. [nwb](https://www.npmjs.com/package/nwb)
1. [React.js](https://reactjs.org/)
1. [MaterialUI](https://material-ui.com/)
1. [Babel](https://babeljs.io/)
1. [Auth0](https://manage.auth0.com/dashboard/us/sglg/)
1. [Axios](https://www.npmjs.com/package/axios)
1. [styled-components](https://styled-components.com/)


## How to use it 

### setup for local development

```
cd sglg-communications
npm install
npm run storybook # shows an interactive demo UI for interacting  with the Chat element
```

### publish to nvm

https://www.npmjs.com/package/sglg-communications

```
npm run build 
npm login
npm publish
```

### Usage

This is a component which can be added to an app via:

`npm install sglg-communications --save`

And called inside the app by:

`import Chat from 'sglg-communications';`
