class Player{
  constructor(name, choose){
    this.name = name;
    this.choose= choose;
  }
  static get ROCK(){
    return 0b001;
  }
  static get PAPER(){
    return 0b100;
  }
  static get SCISSORS(){
    return 0b010;
  }
  rock(){
    this.weapon = Player.ROCK;
    this.choose.src = 'assets/rock.svg';
  }
  paper(){
    this.weapon = Player.PAPER;
    this.choose.src = 'assets/paper.svg';
  }
  scissors(){
    this.weapon = Player.SCISSORS;
    this.choose.src = 'assets/scissors.svg';
  }
  set username(name){
    this.name.innerText = name;
  }
  hideItem(){
    this.choose.style.display = 'none';
    this.choose.className = '';
  }
  showItem(){
    this.choose.style.display = '';
  }
  showWinnerWith(other){
    this.showItem();
    other.showItem();
    if(this.weapon === other.weapon){
      this.tie();
      other.tie();
      return 'TIE';
    }
    if(this.winsOver(other)){
      this.win();
      return 'WIN';
    }
    other.win();
    return 'LOOSE';
  }
  winsOver(other){
    switch(this.weapon){
      case Player.ROCK:
        return other.weapon === Player.SCISSORS;
      case Player.PAPER:
        return other.weapon === Player.ROCK;
      case Player.SCISSORS:
        return other.weapon === Player.PAPER;
    }
  }
  win(){
    this.choose.className = 'bounce animated infinite';
  }
  tie(){
    this.choose.className = 'jello animated infinite';
  }
}
class Game{
  constructor(countdown, log){
    this.countdown = countdown;
    this.log = log;
    this.time = 3;
    this.isCounting = false;
  }
  startCount(time, callback){
    if(!this.isCounting){
      this.isCounting = true;
      this.timer = setInterval(()=>{
        this.countdown.className = 'rubberBand animated infinite';
        this.countdown.innerText = time;
        if(time <= 0){
          clearInterval(this.timer);
          this.isCounting = false;
          this.countdown.className = '';
          
          this.countdown.innerText = 'Game!';
          callback();
        }
        time--;
      }, 1000);
    }
  }
}
let player1, player2, game;
window.onload = function(){
  player1 = new Player(
    document.getElementById('player1Name'),
    document.getElementById('player1Choose')
  );
  player2 = new Player(
    document.getElementById('player2Name'),
    document.getElementById('player2Choose')
  );
  game = new Game(
    document.getElementById('countdown'),
    document.getElementById('log')
  );
};

const rock1key = 'z'
document.addEventListener('keypress', (event) => {
  event.preventDefault();
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
      player1.scissors();
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
      player2.scissors();
      break;
    case ' ':
      player1.hideItem();
      player2.hideItem();
      game.startCount(3,()=>{
        let status = player1.showWinnerWith(player2);
        if(status === 'WIN'){
          game.countdown.innerText = 'PLAYER 1 WINS!'
        }else if(status === 'TIE'){
          game.countdown.innerText = "IT'S A TIE"
        }else{
          game.countdown.innerText = 'PLAYER 2 WINS!'          
        }
      });
    default:
      break;
  }
});