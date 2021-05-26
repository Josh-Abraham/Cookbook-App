import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import { COLOUR_THEME } from '../../constants';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './Page.scss'
import { fetchRecipe, updateRecipe } from '../../utils/sockets';


class InnerPage extends Component {
  componentDidMount() {
    this.fetchRecipeData()
  }

  constructor(props) {
    super(props)
    this.state = {
      recipe: {
        Ingredients: [],
        Instructions: []
      },
      ingredientColumnDefs: [
        {
          field: "Ingredients",
          minWidth: 600
        }],
      instructionsColumnDefs: [
        {
          field: "Instructions",
          minWidth: 4000
        }
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        wrapText: false,
        autoHeight: false,
        editable: true
      },
    }
    this.onAddInstruction = this.onAddInstruction.bind(this)
    this.onAddIngredient = this.onAddIngredient.bind(this)
    this.updateIngredients = this.updateIngredients.bind(this)
    this.updateInstructions = this.updateInstructions.bind(this)
  }

  fetchRecipeData() {
    let data = {
      'name': this.props.name,
      'category': this.props.category
    };
    fetchRecipe(data).then(result1 => {
      console.log(result1)
      this.setState({
        recipe: result1.data
      })
    })
  }

  fetchImage(data) {
    if (data['ImageURL'] !== '') {
      return (
        <img
          alt="recipeImage"
          src={data['ImageURL']}
          className='recipeImage'
        />
      )
    }
    return (
      <img
        alt="recipeImage"
        src={`/${this.props.category}.jpg`}
        className='recipeImage'
      />
    )
  }

  onAddInstruction = () => {
    this.instructionGridApi.updateRowData({
      add: [{ 'Instructions': '' }]
    });
  }

  onAddIngredient() {
    this.ingredientGridApi.updateRowData({
      add: [{ 'Ingredients': '' }]
    });
  }

  updateIngredients(value) {
    const recipeData = JSON.parse(JSON.stringify(this.state.recipe));
    recipeData['Ingredients'][value.rowIndex] = value.data
    const data = {
      name: this.props.name,
      category: this.props.category,
      data: recipeData
    }
    updateRecipe(data)
  }

  updateInstructions(value) {
    const recipeData = JSON.parse(JSON.stringify(this.state.recipe));
    recipeData['Instructions'][value.rowIndex] = value.data
    const data = {
      name: this.props.name,
      category: this.props.category,
      data: recipeData
    }
    updateRecipe(data)
  }

  onInstructionGridReady = (params) => {
    this.instructionGridApi = params.api;
    this.instructionGridColumnApi = params.columnApi;
  }

  onIngredientGridReady = (params) => {
    this.ingredientGridApi = params.api;
    this.ingredientGridColumnApi = params.columnApi;
  }

  fetchPage(name, data) {
    const image = this.fetchImage(data);
    return (
      <div>
        <div className='recipeHeader'>
          {this.props.category}
        </div>
        <hr className='titleBreak'></hr>
        <div className='recipeTitle'>
          {name}
        </div>
        <hr className='titleBreak'></hr>
        <div className='pageWrapper'>
          <div className='leftPagePart'>
            <div
              id="ingredientDiv"
              style={{
                height: "40vh",
              }}
              className="ag-theme-alpine"
            >
              <AgGridReact
                columnDefs={this.state.ingredientColumnDefs}
                defaultColDef={this.state.defaultColDef}
                onGridReady={this.onIngredientGridReady.bind(this)}
                rowData={data.Ingredients}
                onCellValueChanged={this.updateIngredients}
              />
            </div>
          </div>
          <div className='rightPagePart'>
            <table>
              <thead>
                <tr className='tableTitle'>
                  <th>Total Time</th>
                  <th>Yield</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data['Total Time']}</td>
                  <td>{data['Yield']}</td>
                </tr>
              </tbody>
            </table>
            <hr className='rightBreak'></hr>
            {image}
          </div>
        </div>
        <div
          id="instructionDiv"
          style={{
            height: "30vh",
            paddingLeft: '33px',
            paddingRight: '33px'
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={this.state.instructionsColumnDefs}
            defaultColDef={this.state.defaultColDef}
            onGridReady={this.onInstructionGridReady.bind(this)}
            rowData={data.Instructions}
            onCellValueChanged={this.updateInstructions}
          />
        </div>
        <div className='bottomButtons'>
          <ThemeProvider theme={COLOUR_THEME}>
            <Button
              onClick={this.onAddIngredient}
              color="primary"
              variant="outlined"
              className='button'
              style={{ 'marginRight': '20px' }}
              autoFocus>
              Add Ingredient
            </Button>
            <Button
              onClick={this.onAddInstruction}
              color="primary"
              variant="outlined"
              className='button'
              autoFocus>
              Add Instruction or Note
            </Button>
          </ThemeProvider>
        </div>
        <div className='bottomOfPage'>
          {`Page ${this.props.page}`}
        </div>
      </div>
    )
  }

  render() {
    const page = this.fetchPage(this.props.name, this.state.recipe)
    return (
      <div>
        {page}
      </div> 
    );
  }
}

InnerPage.propTypes = {
  category: Proptypes.string.isRequired,
  name: Proptypes.string.isRequired,
  selected: Proptypes.bool,
  page: Proptypes.number
}

export default InnerPage;
