# Webpack React Boilerplate

[Isomorphic Branch](https://github.com/mderrick/webpack-react-boilerplate/tree/fluxible) work in progress can be found here.

### Quick start
- `npm install`
- `npm install gulp -g`
- `gulp serve`

### Options
- `--watch` - watches for filechanges. Rebuilds webpack and refreshes browser.
- `--release` - Runs the release build by minifying etc.
- `--env=<ENV>` - Loads in the settings from file `env/<ENV>.js`


### TODO
- Stylesheets for routes (Right now including all CSS in one stylsheet but we need to only include CSS for the HTML that is rendered). Further CSS at a code split should be returned within the JS chunk. [See here](https://github.com/webpack/react-webpack-server-side-example/blob/master/server/style-collector.loader.js) for help maybe.)
- Tidy where we build serverside `entry.js` in the build gulp task.
- Look into a more reliable way to overide plugins and loaders array items without relying on position.
- Add flux and build a small demo
- Make it pretty
- Livereload change event to include changed filename