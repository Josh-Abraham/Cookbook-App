import React, { Component } from 'react';
import Proptypes from 'prop-types';
import './Page.scss'
import InnerPage from './InnerPage'


class Page extends Component {

  render() {

    if (this.props.selected) {
      const page1 = <InnerPage
        name={this.props.name1}
        page={this.props.page*2 -1}
        category={this.props.category}
      />
      const page2 = typeof (this.props.name2) !== 'undefined' ? 
      <InnerPage
        name={this.props.name2}
        page={this.props.page*2}
        category={this.props.category}
      /> : null;
      return (
        <div className="pageSet">
          <div className='externalPage'>
            <div className='pageStackLeft' />
            <div className='internalPageLeft'>
              {page1}
            </div>
          </div>
          <div className='externalPage'>
            <div className='pageStackRight' />
            <div className='internalPageRight'>
              {page2}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div></div>
    )
  }
}

Page.propTypes = {
  category: Proptypes.string.isRequired,
  name1: Proptypes.string.isRequired,
  name2: Proptypes.string,
  selected: Proptypes.bool,
  page: Proptypes.number
}

export default Page;
