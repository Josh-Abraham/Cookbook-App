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


class AddRecipe extends Component {
  constructor() {
    super();
    this.state = {
      recipeURL: '',
      recipeName: '',
      category: ''
    }
    this.handleTextFieldBlurRecipe = this.handleTextFieldBlurRecipe.bind(this)
    this.handleTextFieldBlurName = this.handleTextFieldBlurName.bind(this)
    this.handleDropdownSelect = this.handleDropdownSelect.bind(this)
  }

  getTextField(defaultValue, label) {
    return <TextFieldUI
      id={'getRecipeTextField'}
      label={label}
      variant='outlined'
      onBlur={this.handleTextFieldBlurRecipe}
      color='primary'
      defaultValue={''}
  />
  }

  handleTextFieldBlurRecipe(e) {
    const textInput = e.target.value;
      this.setState({
        recipeURL: textInput
      });
  }

  getTextFieldName(label) {
    return <TextFieldUI
      id={'getRecipeTextField'}
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
    const getRecipeURL = this.getTextField('URL', 'Recipe URL')
    // const getRecipeName = this.getTextFieldName('Recipe Name')
    const getRecipeCat = this.getDropDown();
   
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
              {getRecipeURL}
              {/* {getRecipeName} */}
              {getRecipeCat}
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.cancel} color="primary">
                Cancel
              </Button>
              <Button 
                onClick={this.props.addRecipe.bind(this, this.state)}
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


AddRecipe.propTypes = {
  cancel: Proptypes.func.isRequired,
  addRecipe: Proptypes.func.isRequired
}

export default AddRecipe;
