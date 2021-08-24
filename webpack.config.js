var Encore = require("@symfony/webpack-encore");
var path = require("path");
const Dotenv = require("dotenv-webpack");

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "dev");
}

Encore.addPlugin(new Dotenv())
  // directory where compiled assets will be stored
  .setOutputPath("public/build")
  // public path used by the web server to access the output path
  // .setPublicPath('/build')
  // // only needed for CDN's or sub-directory deploy
  // //.setManifestKeyPrefix('build/')

  // this is your *true* public path
  .setPublicPath("/build")
  // this is now needed so that your manifest.json keys are still `build/foo.js`
  // (which is a file that's used by Symfony's `asset()` function)
  // .setManifestKeyPrefix('build')
  /*
   * ENTRY CONFIG
   *
   * Add 1 entry for each "page" of your app
   * (including one that's included on every page - e.g. "app")
   *
   * Each entry will result in one JavaScript file (e.g. index.js)
   * and one CSS file (e.g. index.css) if your JavaScript imports CSS.
   */
  .addEntry("index", "./assets/js/components/index.js")
  .addEntry("forms", "./assets/js/components/forms.js")
  .addEntry("home", "./assets/js/components/home.js")
  .addEntry("app", "./assets/js/components/App.js")
  // .addEntry('footer', './assets/js/components/footer.js')
  //.addEntry('page1', './assets/js/page1.js')
  //.addEntry('page2', './assets/js/page2.js')

  // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
  .splitEntryChunks()

  // will require an extra script tag for runtime.js
  // but, you probably want this, unless you're building a single-page app
  .enableSingleRuntimeChunk()

  /*
   * FEATURE CONFIG
   *
   * Enable & configure other features below. For a full
   * list of features, see:
   * https://symfony.com/doc/current/frontend.html#adding-more-features
   */
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  // enables hashed filenames (e.g. app.abc123.css)
  .enableVersioning(Encore.isProduction())

  // enables @babel/preset-env polyfills
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = "usage";
    config.corejs = 3;
  })
  .configureBabel(function (babelConfig) {
    babelConfig.plugins.push("@babel/plugin-proposal-class-properties");
  })

  // enables Sass/SCSS support
  //.enableSassLoader()

  // uncomment if you use TypeScript
  //.enableTypeScriptLoader()

  // uncomment to get integrity="..." attributes on your script & link tags
  // requires WebpackEncoreBundle 1.4 or higher
  //.enableIntegrityHashes(Encore.isProduction())

  // uncomment if you're having problems with a jQuery plugin
  //.autoProvidejQuery()

  // uncomment if you use API Platform Admin (composer req api-admin)
  .enableReactPreset();
//.addEntry('admin', './assets/js/admin.js')
const config = Encore.getWebpackConfig();
config.resolve.alias = {
  app: path.resolve(__dirname, "./"),
};

module.exports = config;
