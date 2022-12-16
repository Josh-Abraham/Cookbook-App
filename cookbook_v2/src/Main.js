import Button from '@material-ui/core/Button';
import { TextField as TextFieldUI } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { COLOUR_THEME } from './constants';
import { FlippingPages } from 'flipping-pages';
import 'flipping-pages/dist/style.css';
import { useState } from 'react';
import './Main.scss';

const Main = () => {
    const [selected, setSelected] = useState(0);

    const back = () => {
        setSelected(selected => Math.max(selected - 1, 0));
    };

    const next = () => {
        setSelected(selected => Math.min(selected + 1, 2));
    };

  
    const getTextField = () => {
      return <TextFieldUI
        id={'changePageNumber'}
        className='pageNumberTextfield'
        variant='outlined'
        onBlur={handleTextFieldBlur}
        color='primary'
        defaultValue={selected}
      />
    };

    const handleTextFieldBlur = (e) => {
      
      let textInput = parseInt(e.target.value);
      textInput = Math.ceil(textInput / 2)
      console.log(textInput);
      setSelected(parseInt(textInput));
      
    };

    return (
        <div>
            <div className="pages">
                <FlippingPages
                    direction="right-to-left"
                    onSwipeEnd={setSelected}
                    selected={selected}
                >
                    <div className="page cover">
                      <img
                        alt="Cookbook"
                        src="/book.jpg"
                      />
                    </div>
                    <div className="page page1">Page 1</div>
                    <div className="page page2">Page 2</div>
                    <div className="page page3">Page 3</div>
                    <div className="page backcover">
                      <img
                        alt="Cookbook"
                        src="/bookback.jpg"
                      />
                    </div>
                </FlippingPages>
            </div>
            <div className='bottomBar'>
              <ThemeProvider theme={COLOUR_THEME}>
                <Button
                onClick={back}
                  color="primary"
                  variant="contained"
                  className='bottomButton'
                >
                  Back
                </Button>
                {getTextField("")}
                <Button
                  onClick={next}
                  color="primary"
                  variant="contained"
                  className='bottomButton'
                >
                  Next
                </Button>
              </ThemeProvider>
            </div>
        </div>
    );
};

export default Main;