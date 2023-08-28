"use strict";

var _yargs = _interopRequireDefault(require("yargs"));
var _helpers = require("yargs/helpers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
(0, _yargs.default)((0, _helpers.hideBin)(process.argv)).command(['copy'], 'Copy a new template from local file', argv => {
  Promise.resolve().then(() => _interopRequireWildcard(require('./copy/index.js'))).then(({
    default: parseOptions
  }) => {
    parseOptions(argv);
  });
}).command(['create', 'c'], 'Create a new template from Git repo', yargs => {
  return yargs.option('name', {
    alias: 'n',
    demand: false,
    describe: 'Template name',
    type: 'string'
  }).option('force', {
    alias: 'f',
    demand: false,
    describe: 'overwrite target directory if it is existed',
    type: 'boolean'
  });
}, argv => {
  Promise.resolve().then(() => _interopRequireWildcard(require('./create/index.js'))).then(({
    default: create
  }) => {
    create(argv.name, argv);
  });
}).command(['use'], 'Some Command Interpretation', argv => {
  Promise.resolve().then(() => _interopRequireWildcard(require('./help/index.js'))).then(({
    default: help
  }) => {
    help(argv);
  });
}).parse();