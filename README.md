## React Editable Textfield
A simple React component for a editable textfield with event handlers for updates to the text.
This is inspired by the Atlassian [inline-editable-textfield](https://atlaskit.atlassian.com/packages/core/inline-edit/docs/inline-editable-textfield)
used in Jira and other Atlassian products.

## Features
- Confirmation and cancellation buttons
- Auto update on blur

### Coming Soon
- Nothing new in the works

## Suggestions & Feature Requests
If you have any suggestions for improvements for feature requests, open an issue on the [github page](https://github.com/jameschristou/react-editable-textfield/issues)

## Demo
Here is a simple demo.

![img](demo.gif)

## Installation
The package can be installed via npm
```
npm install @jchristou/react-editable-textfield
```

### Peer Dependencies
Install the following **peer dependencies** with given versions
```
"react": "^16.10.2",
"react-dom": "^16.10.2"
```

## Usage
See the [example project](https://github.com/jameschristou/react-editable-textfield/tree/master/example). This uses the `npm` published version of the component.

### Default Styling
To include the default styling you will need to import it
```js
import '@jchristou/react-editable-textfield/dist-component/style.css';
```

## Development
Run `npm install` to install all packages and depenedencies.

### Dev
To run dev server with HMR while developing use `npm run start`. This will run the project on http://localhost:8080 by default.

There is a `TestPage.js` component located in the `test` folder (see [TestPage.js]((https://github.com/jameschristou/react-editable-textfield/tree/master/test/components/TestPage.js))) which you can use for testing.

### Production
`npm run build`

### Analysis
`npm run build:analyze` builds static analysis to examine bundle sizing. You can see output reports in dist/stats.html and dist/report.html
then use http-server to run a http server and access the stats.html. Just run `http-server dist` (ensure you have http-server installed globally)
the dist parameter ensures that it uses the dist folder. It will give you an IP address e.g. http://172.17.126.81:8080 then you can access
stats.html using http://172.17.126.81:8080/stats.html.