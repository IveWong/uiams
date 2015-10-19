/*!
 * Index(Page)
 * Copyright(c) 2015 Ive Wang
 * Copyright(c) 2015 Jnfinity
 * MIT Licensed
 */

import 'babel-core/polyfill';
import React, { Component, PropTypes } from 'react'; 

class Index extends Component {

  static propTypes = {
  	title: PropTypes.string
  };

  static defaultProps = {
  	title: ''
  };

  render() {
  	return (
    	<h2>Hello,World</h2>
  	);
  }

}

export default Index;
