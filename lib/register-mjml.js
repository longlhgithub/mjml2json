'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mjmlCore = require('mjml-core');

Object.keys(_mjmlCore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mjmlCore[key];
    }
  });
});

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _mjmlButton = require('mjml-button');

var _mjmlButton2 = _interopRequireDefault(_mjmlButton);

var _mjmlColumn = require('mjml-column');

var _mjmlColumn2 = _interopRequireDefault(_mjmlColumn);

var _mjmlContainer = require('mjml-container');

var _mjmlContainer2 = _interopRequireDefault(_mjmlContainer);

var _mjmlDivider = require('mjml-divider');

var _mjmlDivider2 = _interopRequireDefault(_mjmlDivider);

var _mjmlGroup = require('mjml-group');

var _mjmlGroup2 = _interopRequireDefault(_mjmlGroup);

var _mjmlHtml = require('mjml-html');

var _mjmlHtml2 = _interopRequireDefault(_mjmlHtml);

var _mjmlImage = require('mjml-image');

var _mjmlImage2 = _interopRequireDefault(_mjmlImage);

var _mjmlLocation = require('mjml-location');

var _mjmlLocation2 = _interopRequireDefault(_mjmlLocation);

var _mjmlAccordion = require('mjml-accordion');

var _mjmlAccordion2 = _interopRequireDefault(_mjmlAccordion);

var _mjmlCarousel = require('mjml-carousel');

var _mjmlCarousel2 = _interopRequireDefault(_mjmlCarousel);

var _mjmlHero = require('mjml-hero');

var _mjmlHero2 = _interopRequireDefault(_mjmlHero);

var _mjmlInvoice = require('mjml-invoice');

var _mjmlInvoice2 = _interopRequireDefault(_mjmlInvoice);

var _mjmlNavbar = require('mjml-navbar');

var _mjmlNavbar2 = _interopRequireDefault(_mjmlNavbar);

var _mjmlRaw = require('mjml-raw');

var _mjmlRaw2 = _interopRequireDefault(_mjmlRaw);

var _mjmlSection = require('mjml-section');

var _mjmlSection2 = _interopRequireDefault(_mjmlSection);

var _mjmlSocial = require('mjml-social');

var _mjmlSocial2 = _interopRequireDefault(_mjmlSocial);

var _mjmlSpacer = require('mjml-spacer');

var _mjmlSpacer2 = _interopRequireDefault(_mjmlSpacer);

var _mjmlTable = require('mjml-table');

var _mjmlTable2 = _interopRequireDefault(_mjmlTable);

var _mjmlText = require('mjml-text');

var _mjmlText2 = _interopRequireDefault(_mjmlText);

var _mjmlWrapper = require('mjml-wrapper');

var _mjmlWrapper2 = _interopRequireDefault(_mjmlWrapper);

var _mjmlHeadAttributes = require('mjml-head-attributes');

var _mjmlHeadAttributes2 = _interopRequireDefault(_mjmlHeadAttributes);

var _mjmlHeadFont = require('mjml-head-font');

var _mjmlHeadFont2 = _interopRequireDefault(_mjmlHeadFont);

var _mjmlHeadStyle = require('mjml-head-style');

var _mjmlHeadStyle2 = _interopRequireDefault(_mjmlHeadStyle);

var _mjmlHeadTitle = require('mjml-head-title');

var _mjmlHeadTitle2 = _interopRequireDefault(_mjmlHeadTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Accordion = _mjmlAccordion2.default.Accordion,
    AccordionElement = _mjmlAccordion2.default.AccordionElement,
    AccordionTitle = _mjmlAccordion2.default.AccordionTitle,
    AccordionText = _mjmlAccordion2.default.AccordionText;
var Hero = _mjmlHero2.default.Hero,
    HeroContent = _mjmlHero2.default.HeroContent;
var Invoice = _mjmlInvoice2.default.Invoice,
    InvoiceItem = _mjmlInvoice2.default.InvoiceItem;
var Carousel = _mjmlCarousel2.default.Carousel,
    CarouselImage = _mjmlCarousel2.default.CarouselImage;
var Navbar = _mjmlNavbar2.default.Navbar,
    InlineLinks = _mjmlNavbar2.default.InlineLinks,
    Link = _mjmlNavbar2.default.Link;


(0, _each2.default)([Accordion, AccordionElement, AccordionText, AccordionTitle, _mjmlButton2.default, Carousel, CarouselImage, _mjmlColumn2.default, _mjmlContainer2.default, _mjmlDivider2.default, _mjmlGroup2.default, Hero, HeroContent, _mjmlHtml2.default, _mjmlImage2.default, InlineLinks, Invoice, InvoiceItem, Link, _mjmlLocation2.default, Navbar, _mjmlRaw2.default, _mjmlSection2.default, _mjmlSocial2.default, _mjmlSpacer2.default, _mjmlTable2.default, _mjmlText2.default, _mjmlWrapper2.default], function (tag) {
  return (0, _mjmlCore.registerMJElement)(tag);
});

(0, _each2.default)([_mjmlHeadAttributes2.default, _mjmlHeadFont2.default, _mjmlHeadStyle2.default, _mjmlHeadTitle2.default], function (tag) {
  return (0, _mjmlCore.registerMJHeadElement)(tag);
});