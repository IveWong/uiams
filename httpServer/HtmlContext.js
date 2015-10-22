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
  	title: React.PropTypes.string,
    bodyContent: React.PropTypes.string.isRequired
  },
  render: function(){
    return React.createElement('html', {className: 'no-js', lang: ''},
    	React.createElement('head', null,
    		React.createElement('meta', {charSet: 'utf-8'}),
    		React.createElement('title', null, this.props.title)
    	),
    	React.createElement('body', {dangerouslySetInnerHTML: { __html: this.props.bodyContent }})
    );
  }
});

module.exports = HtmlContext;
