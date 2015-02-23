# Webpack React Boilerplate

### Quick start
- `npm install`
- `npm install gulp -g`
- `gulp serve`

### Options
- `--watch` - watches for filechanges. Rebuilds webpack and refreshes browser.
- `--release` - Runs the release build by minifying etc.
- `--env=<ENV>` - Loads in the settings from file `env/<ENV>.js`


### TODO
- Server file to include chunk (means forking react-proxy and giving chunks a name)
- Remove handlebars from server
- Isomorphic
- Add flux and build a small demo
- Make it pretty
- Livereload change event to include changed filename