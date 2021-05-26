import React, { Component } from 'react';
import Proptypes from 'prop-types';
import './TableOfContents.scss'
import recipeList from '../recipes/recipeList.json'


class TableOfContents extends Component {

  fetchRecipeList(catList, iterate) {
    let i = iterate;
    const tableOfContentsList = catList.map((recipe) => {
      i = i + 1
      return (
        <li key={`${recipe['name']}_${i}`}>
          <span> {recipe['name']}</span>
          <span>{i}</span>
        </li>
      )
    })

    return (
      <ul className="leaders">
        {tableOfContentsList}
      </ul>
    )
  }

  render() {
    if (this.props.selected) {
      const catList1 = recipeList[this.props.category1]
    const list1 = this.fetchRecipeList(catList1, this.props.iterate);

    const catList2 = recipeList[this.props.category2]
    const list2 = this.fetchRecipeList(catList2, this.props.iterate + catList1.length);

    return (
      <div className="pageSet">
        <div className='externalPage'>
          <div className='pageStackLeft' />
          <div className='internalPageLeft'>
            <div id="toc_container">
            <p className="toc_title">{`Recipes: ${this.props.category1}`}</p>
              {list1}
            </div>
          </div>
        </div>
        <div className='externalPage'>
          <div className='pageStackRight' />
          <div className='internalPageRight'>
            <div id="toc_container">
              <p className="toc_title">{`Recipes: ${this.props.category2}`}</p>
              {list2}
            </div>
          </div>
        </div>
      </div>
    );
    }

    return (
      <div className="pageSet">
      </div>
    );
  }
}

TableOfContents.propTypes = {
  category1: Proptypes.string.isRequired,
  category2: Proptypes.string.isRequired,
  iterate: Proptypes.number,
  selected: Proptypes.bool
}
export default TableOfContents;
