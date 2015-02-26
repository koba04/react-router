"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = require("react");
var classSet = require("react/lib/cx");
var assign = require("react/lib/Object.assign");
var PropTypes = require("../PropTypes");

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

/**
 * <Link> components are used to create an <a> element that links to a route.
 * When that route is active, the link gets an "active" class name (or the
 * value of its `activeClassName` prop).
 *
 * For example, assuming you have the following route:
 *
 *   <Route name="showPost" path="/posts/:postID" handler={Post}/>
 *
 * You could use the following component to link to that route:
 *
 *   <Link to="showPost" params={{ postID: "123" }} />
 *
 * In addition to params, links may pass along query string parameters
 * using the `query` prop.
 *
 *   <Link to="showPost" params={{ postID: "123" }} query={{ show:true }}/>
 */

var Link = (function (_React$Component) {
  function Link() {
    _classCallCheck(this, Link);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Link, _React$Component);

  _prototypeProperties(Link, null, {
    handleClick: {
      value: function handleClick(event) {
        var allowTransition = true;
        var clickResult;

        if (this.props.onClick) clickResult = this.props.onClick(event);

        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }if (clickResult === false || event.defaultPrevented === true) allowTransition = false;

        event.preventDefault();

        if (allowTransition) this.context.router.transitionTo(this.props.to, this.props.params, this.props.query);
      },
      writable: true,
      configurable: true
    },
    getHref: {

      /**
       * Returns the value of the "href" attribute to use on the DOM element.
       */

      value: function getHref() {
        return this.context.router.makeHref(this.props.to, this.props.params, this.props.query);
      },
      writable: true,
      configurable: true
    },
    getClassName: {

      /**
       * Returns the value of the "class" attribute to use on the DOM element, which contains
       * the value of the activeClassName property when this <Link> is active.
       */

      value: function getClassName() {
        var classNames = {};

        if (this.props.className) classNames[this.props.className] = true;

        if (this.getActiveState()) classNames[this.props.activeClassName] = true;

        return classSet(classNames);
      },
      writable: true,
      configurable: true
    },
    getActiveState: {
      value: function getActiveState() {
        return this.context.router.isActive(this.props.to, this.props.params, this.props.query);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var props = assign({}, this.props, {
          href: this.getHref(),
          className: this.getClassName(),
          onClick: this.handleClick
        });

        if (props.activeStyle && this.getActiveState()) props.style = props.activeStyle;

        return React.DOM.a(props, this.props.children);
      },
      writable: true,
      configurable: true
    }
  });

  return Link;
})(React.Component);

// TODO: Include these in the above class definition
// once we can use ES7 property initializers.
// https://github.com/babel/babel/issues/619

Link.contextTypes = {
  router: PropTypes.router.isRequired
};

Link.propTypes = {
  activeClassName: PropTypes.string.isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.route]).isRequired,
  params: PropTypes.object,
  query: PropTypes.object,
  activeStyle: PropTypes.object,
  onClick: PropTypes.func
};

Link.defaultProps = {
  activeClassName: "active"
};

module.exports = Link;