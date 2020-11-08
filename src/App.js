import React, { Component } from 'react';
import Snake from './Snake';
import Food from './Food';

function getRandom(max, min) {
  return Math.floor((Math.random() * (max - min * 1) * min) / 2) * 2;
  };

const getRandomCoordinates = () => {
  const min = 1;
  const max = 98;
  const x = getRandom(max, min);
  const y = getRandom(max, min);
  const position = [x, y];
  return position;
};

const initialState = {
  food: getRandomCoordinates(),
  direction:"RIGHT",
  speed: 200,
  snakeDots: [
    [0,0],
    [2,0],
  ]
};

class App extends Component { 
  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.addEventListener("keydown", this.onKeyPressed);
  }

  componentWillUnmount () {
    document.removeEventListener("keydown", this.onKeyPressed);
  }

  componentDidUpdate() {
    
  }

  onKeyPressed = (e) => {
    switch (e.keyCode) {
      case 38:
        this.setState({direction: "UP"});
        break;
      case 40:
        this.setState({direction: "DOWN"});
        break;
      case 37:
        this.setState({direction: "LEFT"});
        break;
      case 39:
        this.setState({direction: "RIGHT"});
        break;
      default:
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];
    const [x, y] = head;

    switch (this.state.direction) {
      case "RIGHT":
        head = [x + 2, y];
        break;
      case "LEFT":
        head = [x - 2, y];
        break;
      case "DOWN":
        head = [x, y + 2];
        break;
      case 'UP':
        head = [x, y - 2];
        break;
      default: 
         head = dots[dots.length - 1];  	
    }  

    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    });
    this.checkIfOutOfBorders(dots);
    this.checkIfCollapsed(dots);
    this.checkIfEat(dots);
  }

  checkIfOutOfBorders(snakeDots) {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] <0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed(snakeDots) {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    });
  }

  checkIfEat(snakeDots) {
    let head = snakeDots[snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates()
      });
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    });
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed * 0.95,
      });
    }
  }

  onGameOver() {
    alert(`Game Over. Snake lenth is ${this.state.snakeDots}`);
    this.setState(initialState);
  }

  onPlayAgainClicked = () => {
    this.setState(initialState);
  };

  render() {
    return (
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots}/>
        <Food dot={this.state.food} />
      </div>
    );
  }
}
export default App;
