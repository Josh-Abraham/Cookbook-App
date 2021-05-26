import React, { Component } from 'react';
import FlippingPages from 'flipping-pages'
import Button from '@material-ui/core/Button';
import { TextField as TextFieldUI } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { COLOUR_THEME } from './constants';
import AddRecipe from './AddRecipe';
import AddCustomRecipe from './AddCustomRecipe';
/* IMPORTANT */
import 'flipping-pages/FlippingPages.css'
import './Main.scss';
import Page from './Page';
import TableOfContents from './TableOfContents'
import recipeList from './recipes/recipeList.json'
import recipeDataScraper from  'recipe-data-scraper';
import { addCustomRecipe } from './utils/sockets';


class Main extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      selected: 0,
      showModal: false,
      showCustomModal: false
    }
    this.handleSelectedChange = this.handleSelectedChange.bind(this)
    this.previous = this.previous.bind(this)
    this.next = this.next.bind(this)
    this.onAddRecipeClick = this.onAddRecipeClick.bind(this)
    this.onAddRecipeURLClick = this.onAddRecipeURLClick.bind(this)
    this.onRecipeCancel = this.onRecipeCancel.bind(this)
    this.onAddRecipe = this.onAddRecipe.bind(this)
    this.onAddCustomRecipe = this.onAddCustomRecipe.bind(this)
    this.handleTextFieldBlur = this.handleTextFieldBlur.bind(this)
    this.checkSelected = this.checkSelected.bind(this)
  }

  handleSelectedChange(selected) {
    this.setState({ selected })
  }

  // Navigation

  previous() {
    this.setState(state => ({
      selected: state.selected - 1
    }))
  }

  next() {
    this.setState(state => ({
      selected: state.selected + 1
    }))
  }

  jumpto(newPage) {
    this.setState({
      selected: newPage
    })
  }

  getTextField(label) {
    return <TextFieldUI
      id={'changePageNumber'}
      className='pageNumberTextfield'
      label={label}
      variant='outlined'
      onBlur={this.handleTextFieldBlur}
      color='primary'
      defaultValue={this.state.selected}
    />
  }

  handleTextFieldBlur(e) {
    let textInput = parseInt(e.target.value);
    textInput = Math.ceil(textInput / 2)
    if (textInput >= 0) {
      this.setState({
        selected: parseInt(textInput)
      });
    }
  }

  // RECIPE MODAL

  onAddRecipeURLClick() {
    this.setState({
      showModal: true
    })
  }

  onAddRecipeClick() {
    this.setState({
      showCustomModal: true
    })
  }

  onRecipeCancel() {
    this.setState({
      showModal: false,
      showCustomModal: false
    })
  }

  getAddRecipeModal() {
    if (this.state.showModal) {
      return <AddRecipe
        cancel={this.onRecipeCancel}
        addRecipe={this.onAddRecipe}
      />
    }
    return null;
  }


  onAddRecipe(params) {
    const data = params;
    recipeDataScraper(data['recipeURL'])

    // addRecipe(data).then(result => {
    //   this.setState({
    //     showModal: false
    //   })
    // })
  }

  getAddCustomRecipeModal() {
    if (this.state.showCustomModal) {
      return <AddCustomRecipe
        cancel={this.onRecipeCancel}
        addCustomRecipe={this.onAddCustomRecipe}
      />
    }
    return null;
  }


  onAddCustomRecipe(params) {
    const data = params;
    addCustomRecipe(data).then(result => {
      console.log(result)
      this.setState({
        showCustomModal: false
      })
    })
  }

  

  fetchPages(category, iterate) {
    const catList = recipeList[category]
    let i = iterate
    let pageList = []
    for (let x = 0; x < catList.length; x = x + 2) {
      i = i + 1
      if (catList.length > x + 1) {
        pageList.push(<Page
          category={category}
          name1={catList[x]['name']}
          name2={catList[x+1]['name']}
          selected={this.checkSelected(i)}
          page={i}
          key={`${category}_${i}`}
        />)
      } else {
        pageList.push(<Page
          category={category}
          name1={catList[x]['name']}
          selected={this.checkSelected(i)}
          page={i}
          key={`${category}_${i}`}
        />)
      }

    }

    return pageList
  }

  checkSelected(i) {
    return (this.state.selected === i - 1 || this.state.selected === i || this.state.selected === i + 1)
  }

  render() {
    const pageSums = [
      3 + Math.ceil(recipeList['Breakfasts'].length/2),
      3 + Math.ceil(recipeList['Breakfasts'].length/2) + Math.ceil(recipeList['Soups & Salads'].length/2),
      3 + Math.ceil(recipeList['Breakfasts'].length/2) + Math.ceil(recipeList['Soups & Salads'].length/2) + Math.ceil(recipeList['Sides'].length/2),
      3 + Math.ceil(recipeList['Breakfasts'].length/2) + Math.ceil(recipeList['Soups & Salads'].length/2) + Math.ceil(recipeList['Sides'].length/2) + Math.ceil(recipeList['Mains'].length/2),
      3 + Math.ceil(recipeList['Breakfasts'].length/2) + Math.ceil(recipeList['Soups & Salads'].length/2) + Math.ceil(recipeList['Sides'].length/2) + Math.ceil(recipeList['Mains'].length/2) + Math.ceil(recipeList['Desserts & Baked Goods'].length/2),
      3 + Math.ceil(recipeList['Breakfasts'].length/2) + Math.ceil(recipeList['Soups & Salads'].length/2) + Math.ceil(recipeList['Sides'].length/2) + Math.ceil(recipeList['Mains'].length/2) + Math.ceil(recipeList['Desserts & Baked Goods'].length/2) + Math.ceil(recipeList['Cocktails'].length/2),
    ]
    const addRecipeModal = this.getAddRecipeModal()
    const addCustomRecipeModal = this.getAddCustomRecipeModal()
    const pageSelector = this.getTextField('Page Number');
    const pagesBreakfast = this.fetchPages('Breakfasts', 3)
    const pagesSoups = this.fetchPages('Soups & Salads', pageSums[0])
    const pagesSides = this.fetchPages('Sides', pageSums[1])
    const pagesMains = this.fetchPages('Mains', pageSums[2])
    const pagesDesserts = this.fetchPages('Desserts & Baked Goods', pageSums[3])
    const pagesCocktails = this.fetchPages('Cocktails', pageSums[4])

    return (
      <div className='outerWrapper'>
        {addRecipeModal}
        {addCustomRecipeModal}
        <FlippingPages
          className="App-pages"
          direction="horizontal"
          selected={this.state.selected}
          onSelectedChange={this.handleSelectedChange}
          /* touch-action attribute is required by pointer events
          polyfill */
          touch-action="none"
        >
          <div className="App-page cover">
            <img
              alt="Cookbook"
              src="/book.jpg"
            />
          </div>
          <TableOfContents
            iterate={6}
            category1={'Breakfasts'}
            category2={'Soups & Salads'}
            selected={this.checkSelected(1)}
          />
          <TableOfContents
            iterate={2*pageSums[1]}
            category1={'Sides'}
            category2={'Mains'}
            selected={this.checkSelected(2)}
          />
          <TableOfContents
            iterate={2*pageSums[3]}
            category1={'Desserts & Baked Goods'}
            category2={'Cocktails'}
            selected={this.checkSelected(3)}
          />
          {pagesBreakfast}
          {pagesSoups}
          {pagesMains}
          {pagesSides}
          {pagesDesserts}
          {pagesCocktails}
          <div className="backcover">
            <img
              alt="Cookbook"
              src="/bookback.jpg"
            />
          </div>
        </FlippingPages>
        <div className='rightPanelWrapper'>
          <ThemeProvider theme={COLOUR_THEME}>
            <Button
              onClick={this.onAddRecipeURLClick}
              color="primary"
              variant="contained"
              className='button'
              autoFocus>
              Add Recipe by URL
            </Button>
            <Button
              onClick={this.onAddRecipeClick}
              color="primary"
              variant="contained"
              className='button'
              style={{'paddingTop': '10px'}}
              autoFocus>
              Add Recipe 
            </Button>
            {pageSelector}
          </ThemeProvider>
        </div>
      </div>
    );
  }
}
export default Main;
