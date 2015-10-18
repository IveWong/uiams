/*!
 * Index(Page)
 * Copyright(c) 2015 Ive Wang
 * Copyright(c) 2015 Jnfinity
 * MIT Licensed
 */

import 'babel-core/polyfill';
import React, { Component, PropTypes } from 'react'; 

class InvestListPage extends Component {
	
  static propTypes = {
  	title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    author: PropTypes.string
  };

  static defaultProps = {
  	title: '',
    description: '',
    keywords: '',
    author: ''
  };

	render() {
		return (
			<h3>This is InvestListPage.</h3>
		);
	}
}

export default InvestListPage;
