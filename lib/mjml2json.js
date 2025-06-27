'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = mjml2json;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _htmlparser = require('htmlparser2');

var _htmlparser2 = _interopRequireDefault(_htmlparser);

var _MJMLElementsCollection = require('mjml-core/lib/MJMLElementsCollection');

var _MJMLElementsCollection2 = _interopRequireDefault(_MJMLElementsCollection);

require('./register-mjml');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CDATASections = [];
var MJElements = [];

_lodash2.default.forEach(_extends({}, _MJMLElementsCollection2.default), function (element, name) {
  var tagName = element.tagName || name;

  if (element.endingTag) {
    CDATASections.push(tagName);
  }

  MJElements.push(tagName);
});

function cleanNode(node) {
  delete node.parent;

  // delete children if needed
  if (node.children.length) {
    node.children.forEach(cleanNode);
  } else {
    delete node.children;
  }

  // delete attributes if needed
  if (Object.keys(node.attributes).length === 0) {
    delete node.attributes;
  }
}

/**
 * Avoid htmlparser to parse ending tags
 */
function addCDATASection(content) {
  var regexTag = function regexTag(tag) {
    return new RegExp('<' + tag + '([^>/]*)>([^]*?)</' + tag + '>', 'gmi');
  };
  var replaceTag = function replaceTag(tag) {
    return '<' + tag + '$1><![CDATA[$2]]></' + tag + '>';
  };

  _lodash2.default.forEach(CDATASections, function (tag) {
    content = content.replace(regexTag(tag), replaceTag(tag));
  });

  return content;
}

function parseAttributes(content) {
  var regexTag = function regexTag(tag) {
    return new RegExp('<' + tag + '(\\s("[^"]*"|\'[^\']*\'|[^\'">])*)?>', 'gmi');
  };
  var regexAttributes = /(\S+)\s*?=\s*(['"])(.*?|)\2/gim;

  _lodash2.default.forEach(MJElements, function (tag) {
    content = content.replace(regexTag(tag), function (contentTag) {
      return contentTag.replace(regexAttributes, function (match, attr, around, value) {
        return attr + '=' + around + encodeURIComponent(value) + around;
      });
    });
  });

  return content;
}

/**
 * Convert "true" and "false" string attributes values
 * to corresponding Booleans
 */
function convertBooleansOnAttrs(attrs) {
  return _lodash2.default.mapValues(attrs, function (val) {
    if (val === 'true') {
      return true;
    }
    if (val === 'false') {
      return false;
    }
    return val;
  });
}

function setEmptyAttributes(node) {
  if (!node.attributes) {
    node.attributes = {};
  }
  if (node.children) {
    node.children.forEach(setEmptyAttributes);
  }
}

function parseMjml(xml) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$addEmptyAttribut = _ref.addEmptyAttributes,
      addEmptyAttributes = _ref$addEmptyAttribut === undefined ? true : _ref$addEmptyAttribut,
      _ref$convertBooleans = _ref.convertBooleans,
      convertBooleans = _ref$convertBooleans === undefined ? true : _ref$convertBooleans;

  if (!xml) {
    return null;
  }

  var safeXml = xml;

  safeXml = parseAttributes(safeXml);
  safeXml = addCDATASection(safeXml);

  var mjml = null;
  var cur = null;

  var parser = new _htmlparser2.default.Parser({
    onopentag: function onopentag(name, attrs) {
      attrs = _lodash2.default.mapValues(attrs, function (val) {
        try {
          return decodeURIComponent(val);
        } catch (e) {
          return val;
        }
      });

      if (convertBooleans) {
        // "true" and "false" will be converted to bools
        attrs = convertBooleansOnAttrs(attrs);
      }

      var newNode = {
        parent: cur,
        tagName: name,
        attributes: attrs,
        children: []
      };

      if (cur) {
        cur.children.push(newNode);
      } else {
        mjml = newNode;
      }

      cur = newNode;
    },
    onclosetag: function onclosetag() {
      cur = cur && cur.parent || null;
    },
    ontext: function ontext(text) {
      if (!text) {
        return;
      }

      var val = ('' + (cur && cur.content || '') + text).trim();

      if (val) {
        cur.content = val.replace('$', '&#36;'); // prevent issue with $ sign in MJML
      }
    }
  }, {
    xmlMode: true
  });

  parser.write(safeXml);
  parser.end();

  if (!_lodash2.default.isObject(mjml)) {
    throw new Error('Parsing failed. Check your mjml.');
  }

  cleanNode(mjml);

  // assign "attributes" property if not set
  if (addEmptyAttributes) {
    setEmptyAttributes(mjml);
  }

  return mjml;
}

function mjml2json(input) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var json = parseMjml(input, opts);
  if (opts.stringify) {
    json = JSON.stringify(json);
  }
  return json;
}