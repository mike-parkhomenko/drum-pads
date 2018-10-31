import React from 'react';
import ImagesLayout from './js/components/ImagesLayout';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sounds: {},
      images: {},
      appearBtn: true
    };
  } 

  componentDidMount() {
    fetch('http://localhost:3000/json/data.json') 
      .then(response => response.json())
      .then(data => this.setState({sounds: data.sounds, images: data.svg}));

    window.addEventListener('keydown', this.playSound);
  }

  playSound = (e) => {
    const key = e.type === 'keydown' ? e.keyCode : e.target.dataset.code;
    const btn = document.querySelector(`.kbd[data-code="${key}"]`);
    const audio = document.querySelector(`audio[data-code="${key}"]`);

    if (!audio) return;

    btn.classList.add('pressed');
    audio.currentTime = 0;
    audio.play();
  }

  render() {
    const { sounds, images, appearBtn } = this.state;

    return (
      <div className="App" >
        <div className='main-screen'>
          <div className="keys">
            {Object.keys(sounds).map(sound => ( 
              <CSSTransition
                in={appearBtn}
                appear={true}
                timeout={300}
                classNames='fade'
                key={sound}
              >
                <div className="key">
                  <kbd 
                    className="kbd" 
                    data-code={sounds[sound].code} 
                    onMouseDown={this.playSound}
                    onTransitionEnd={e => e.target.classList.remove('pressed')}
                  >
                    {sounds[sound].kbd}
                  </kbd>
                  <span className="sound">{sound}</span>
                </div>
              </CSSTransition>
            ))}
          </div>
        </div>

        <ImagesLayout images={images}/>

        {Object.keys(sounds).map(sound => 
          <audio 
            data-code={sounds[sound].code}
            src={sounds[sound].src} 
            key={sound}
          />
        )}
      </div>
    );
  }
}

export default App;
