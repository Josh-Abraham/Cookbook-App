import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { TextField as TextFieldUI } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ThemeProvider } from '@material-ui/styles';
import { COLOUR_THEME } from '../constants';
import DropdownSelect from '../DropdownSelect';


class AddCustomRecipe extends Component {
  constructor() {
    super();
    this.state = {
      prepTime: '',
      recipeName: '',
      category: '',
      serving: '',
      recipePicture: ''
    }
    this.handleTextFieldBlurPrepTime = this.handleTextFieldBlurPrepTime.bind(this)
    this.handleTextFieldBlurServing = this.handleTextFieldBlurServing.bind(this)
    this.handleTextFieldBlurName = this.handleTextFieldBlurName.bind(this)
    this.handleTextFieldBlurURL = this.handleTextFieldBlurURL.bind(this)
    this.handleDropdownSelect = this.handleDropdownSelect.bind(this)
  }

  getTextFieldURL(label) {
    return <TextFieldUI
      id={'getRecipeTextFieldURL'}
      style={{'marginLeft': '20px'}}
      label={label}
      variant='outlined'
      onBlur={this.handleTextFieldBlurURL}
      color='primary'
      defaultValue={''}
  />
  }

  handleTextFieldBlurURL(e) {
    const textInput = e.target.value;
      this.setState({
        recipePicture: textInput
      });
  }

  getTextFieldPrepTime(label) {
    return <TextFieldUI
      id={'getRecipeTextFieldPrep'}
      style={{'marginLeft': '20px'}}
      label={label}
      variant='outlined'
      onBlur={this.handleTextFieldBlurPrepTime}
      color='primary'
      defaultValue={''}
  />
  }

  handleTextFieldBlurPrepTime(e) {
    const textInput = e.target.value;
      this.setState({
        prepTime: textInput
      });
  }

  getTextFieldServing(label) {
    return <TextFieldUI
      id={'getRecipeTextFieldServing'}
      style={{'marginLeft': '20px'}}
      label={label}
      variant='outlined'
      onBlur={this.handleTextFieldBlurServing}
      color='primary'
      defaultValue={''}
  />
  }

  handleTextFieldBlurServing(e) {
    const textInput = e.target.value;
      this.setState({
        serving: textInput
      });
  }

  getTextFieldName(label) {
    return <TextFieldUI
      id={'getRecipeTextFieldName'}
      style={{'marginLeft': '20px'}}
      label={label}
      variant='outlined'
      onBlur={this.handleTextFieldBlurName}
      color='primary'
      defaultValue={''}
  />
  }

  handleTextFieldBlurName(e) {
    const textInput = e.target.value;
      this.setState({
        recipeName: textInput
      });
  }

  getDropDown() {
    return (
      <DropdownSelect
        id='dropdownAddRecipe'
        dropdownOptions={["Breakfasts", "Soups & Salads", "Sides", "Mains", "Desserts & Baked Goods", "Cocktails"]}
        dropdownName='Select Category'
        handleChange={this.handleDropdownSelect}
        currentSelection={this.state.category}
      />
    )
  }

  handleDropdownSelect(newSelection) {
    this.setState({
      category: newSelection
    })
  }

  render() {
    const getRecipeName = this.getTextFieldName('Recipe Name')
    const getRecipeCat = this.getDropDown();
    const getPreptime = this.getTextFieldPrepTime('Prep Time')
    const getServing = this.getTextFieldServing('Serving Size')
    const getURL = this.getTextFieldURL('Recipe Picture URL');

      return (
        <div>
          <ThemeProvider theme={COLOUR_THEME}>
          <Dialog
            open={true}
            onClose={null}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
          >
            <DialogTitle id="dialog-title">{"Enter New Recipe"}</DialogTitle>
            <DialogContent>
              {getRecipeName}
              {getURL}
              <div style={{'paddingTop': '10px' }}/>
              {getPreptime}
              {getServing}
              {getRecipeCat}
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.cancel} color="primary">
                Cancel
              </Button>
              <Button 
                onClick={this.props.addCustomRecipe.bind(this, this.state)}
                disabled={this.state.category === '' || this.state.recipeURL === ''}
                color="primary" 
                autoFocus>
                Add
              </Button>
            </DialogActions>
          </Dialog>
          </ThemeProvider>
        </div>
      );
    }
}


AddCustomRecipe.propTypes = {
  cancel: Proptypes.func.isRequired,
  addCustomRecipe: Proptypes.func.isRequired
}

export default AddCustomRecipe;
