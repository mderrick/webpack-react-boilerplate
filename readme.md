# Webpack Isomorphic React Boilerplate

An isomorphic [React](https://github.com/facebook/react) boilerplate using Flux
architecture with [Yahoo's Fluxible](https://github.com/yahoo/fluxible). Built
with [Webpack](https://github.com/webpack/webpack) for code splitting and routing with [react-router](https://github.com/rackt/react-router).

Also uses:
- [Express](https://github.com/strongloop/express)
- [Gulp](https://github.com/gulpjs/gulp)
- [Superagent](https://github.com/visionmedia/superagent)
- [react-proxy-loader](https://github.com/webpack/react-proxy-loader)

### Quick start
- `npm install`
- `bower install`
- `npm install gulp -g`
- `gulp serve`

### Options
- `--watch` - watches for filechanges. Rebuilds webpack and refreshes browser.
- `--release` - Runs the release build by minifying etc.
- `--env=<ENV>` - Loads in the settings from file `env/<ENV>.js`

### TODO
- [x] Tabs to spaces!
- [x] Fix server not keeping alive unless you watch.
- [ ] Expose `statics.loadAction` from the code split proxied view without duplicating in
proxied view.
- [ ] Stylesheets for routes (Right now including all CSS in one stylsheet but we need to only include CSS for the HTML that is rendered). Further CSS at a code split should be returned within the JS chunk. [See here](https://github.com/webpack/react-webpack-server-side-example/blob/master/server/style-collector.loader.js) for help maybe.
- [x] Remove webpack configs into own files `webpack.default.config.js`, `webpack.dev.config.js`, `webpack.release.config.js` and `webpack.server.config.js`.
- [ ] Look into a more reliable way to overide plugins and loaders array items without relying on position.
- [ ] Livereload change event to include changed filename.
- [ ] Namespace CSS correctly.
- [ ] Break down views into subviews.
- [ ] Unit tests.
- [ ] Build a full application.
- [ ] Style loading view for requesting JS and for API requests.