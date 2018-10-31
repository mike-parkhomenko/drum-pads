import React from 'react';
import { CSSTransition } from 'react-transition-group';

class ImagesLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imgAppear: true
    }
  }

  randomizeProp = () => {
    const min = 0;
    const minWidth = 25;
    const maxWidth = 195;
    let maxXPos = window.innerWidth;
    let maxYPos = Math.round(window.innerHeight / 5);
    
    const randomXPos = this.randomNumber(min, maxXPos);
    const randomYPos = this.randomNumber(min, maxYPos);
    const width = this.randomNumber(minWidth, maxWidth);

    return {
      x: randomXPos,
      y: randomYPos,
      width: width
    }
  }

  randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  }

  animateIntro = () => {
    
  }

  render() {
    const { images } = this.props;

    return(
      <div className='images-layout'>
        {Object.keys(images).map(svg => 
          <CSSTransition
            in={this.state.imgAppear}
            appear={true}
            timeout={300}
            classNames='fade'
            key={svg}
          >
            <img 
              className={'img ' + svg} 
              src={images[svg]} 
              alt={svg}
            />
          </CSSTransition>
        )}
      </div>
    )
  }
}

// style={{
//   top: svg !== 'city' && this.randomizeProp().y,
//   left: svg !== 'city' && this.randomizeProp().x,
//   width: svg !== 'city' && this.randomizeProp().width
// }} 

export default ImagesLayout;
