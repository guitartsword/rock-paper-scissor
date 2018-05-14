class Player{
  constructor(nameDOM, choose){
    this.name = name;
    this.choose= choose;
  }
  rock(){
    this.choose.innerText = 'rock';
  }
  paper(){
    this.choose.innerText = 'paper';
  }
  scissor(){
    this.choose.innerText = 'scissor';
  }
  set username(name){
    this.name.innerText = name;
  }
}

let player1, player2;
window.onload = function(){
  player1 = new Player(
    document.getElementById('player1Name'),
    document.getElementById('player1Choose')
  );
  player2 = new Player(
    document.getElementById('player2Name'),
    document.getElementById('player2Choose')
  );
};

const rock1key = 'z'
document.addEventListener('keypress', (event) => {
  const keyName = event.key;
  switch(keyName){
    case 'z':
    case 'Z':
      player1.rock();
      break;
    case 'x':
    case 'X':
      player1.paper();
      break;
    case 'c':
    case 'C':
      player1.scissor();
      break;
    case 'b':
    case 'B':
      player2.rock();
      break;
    case 'n':
    case 'N':
      player2.paper();
      break;
    case 'm':
    case 'M':
      player2.scissor();
      break;
    case ' ':
      player
    default:
      console.log(keyName)
      break;
  }
});