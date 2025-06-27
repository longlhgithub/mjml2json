#!/usr/bin/env node
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _mjml2json = require('./mjml2json');

var _mjml2json2 = _interopRequireDefault(_mjml2json);

var _package = require('../package.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(_package.version).usage('[options] <input-file> <output-file>').option('-s, --stringify', 'Stringify output').parse(process.argv);

if (_commander2.default.args.length !== 2) {
  _commander2.default.outputHelp();
  process.exit(1);
}

var _program$args = _slicedToArray(_commander2.default.args, 2),
    inputFilename = _program$args[0],
    outputFilename = _program$args[1];

var input = _fs2.default.readFileSync(inputFilename, 'utf8');
var opts = {
  stringify: !!_commander2.default.stringify
};
var output = (0, _mjml2json2.default)(input, opts);

_fs2.default.writeFileSync(outputFilename, JSON.stringify(output));

var stringified = opts.stringify ? ' (stringified)' : '';
console.log(inputFilename + ' was converted to JSON format in ' + outputFilename + stringified); // eslint-disable-line no-console