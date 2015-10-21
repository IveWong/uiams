/*!
 * Index(Page)
 * Copyright(c) 2015 Ive Wang
 * Copyright(c) 2015 Jnfinity
 * MIT Licensed
 */

require('babel-core/polyfill');
var React = require('react');

var HtmlContext = React.createClass({
  propTypes:{
    _child: React.PropTypes.element
  },
  render: function(){
    return React.createElement('html', {}, this.props._child);
  }
});

module.exports = HtmlContext;
