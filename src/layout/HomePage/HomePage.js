/*!
 * Index(Page)
 * Copyright(c) 2015 Ive Wang
 * Copyright(c) 2015 Jnfinity
 * MIT Licensed
 */

require('babel-core/polyfill');
var React = require('react');

var HomePage = React.createClass({
  propTypes:{
  	title: React.PropTypes.string,
    bodyContent: React.PropTypes.string.isRequired
  },
  render: function(){
    return React.createElement('div', {className: 'content'},
      React.createElement('div', {className: 'body', style: {background: 'red',width: '100%', height: '100px', float: 'left'}}),
    	React.createElement('div', {className: 'lista', style: {margin: '0 20px 0 0', float: 'left'}},
    		React.createElement('a', {href: './list1', style: {display: 'block'}}, 'list1'),
        React.createElement('a', {href: './list2', style: {display: 'block'}}, 'list2')
    	),
    	React.createElement('div', {className: 'listb', style: {background: '#888', width: '200px', height: '200px', float: 'left'}},
        React.createElement('p', null, 'this is list1\'s text!')
      )
    );
  }
});

module.exports = HomePage;
