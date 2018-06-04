class Player{
  constructor(name, choose){
    this.name = name;
    this.choose = choose;
    this.weapon = 0;
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
  chooseRock(){
    this.weapon = Player.ROCK;
    this.choose.backgroundImage = 'assets/rock.svg';
    TweenMax.to(this.choose, 0.25, {
      backgroundColor: 'rgb(206, 158, 86)'
    });
  }
  choosePaper(){
    this.weapon = Player.PAPER;
    this.choose.src = 'assets/paper.svg';
    TweenMax.to(this.choose, 0.25, {
      backgroundColor: 'rgb(255,255,215)'
    });
  }
  chooseScissors(){
    this.weapon = Player.SCISSORS;
    this.choose.src = 'assets/scissors.svg';
    TweenMax.to(this.choose, 0.25, {
      backgroundColor: 'rgb(100,100,100)'
    });
  }
  set username(name){
    this.name.innerText = name;
  }
  hideItem(){
    this.choose.style.backgroundColor = 'white';
    this.weapon = 0;
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
      default:
        return false;
    }
  }
  win(){
    // TO DO;
  }
  tie(){
    // TO DO;
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
    let tl = new TimelineMax()
    this.countdown.innerText = 3;
    tl.to(this.countdown, 0.5, {  
      opacity: 1
    })
    .to(this.countdown, 0.5, {
      opacity: 0,
    })
    .to(this.countdown, 0, {
      innerText:2,
      opacity:0
    })
    .to(this.countdown, 0.5, {
      opacity: 1
    })
    .to(this.countdown, 0.5, {
      opacity: 0
    })
    .to(this.countdown, 0, {
      innerText:1,
      opacity:0
    })
    .to(this.countdown, 0.5, {
      opacity: 1
    })
    .to(this.countdown, 0.5, {
      opacity: 0
    })
    .to(this.countdown,0,{
      opacity:1
    })
    tl.addCallback(callback, 3)
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
var tl = new TimelineMax({onUpdate:console.log});
tl.to("#sape", 3, {
  innerText: (Math.random()*10+1),
});
const rock1key = 'z'
function startGame(){
  player1.hideItem();
  player2.hideItem();
  game.startCount(3,()=>{
    let status = player1.showWinnerWith(player2);
    if(status === 'WIN'){
      game.countdown.innerText = 'PLAYER 1 WINS!';
    }else if(status === 'TIE'){
      game.countdown.innerText = "IT'S A TIE";
    }else{
      game.countdown.innerText = 'PLAYER 2 WINS!';
    }
  });
}
document.addEventListener('keypress', (event) => {
  event.preventDefault();
  const keyName = event.key;
  switch(keyName){
    case 'z':
    case 'Z':
      player1.chooseRock();
      break;
    case 'x':
    case 'X':
      player1.choosePaper();
      break;
    case 'c':
    case 'C':
      player1.chooseScissors();
      break;
    case 'b':
    case 'B':
      player2.chooseRock();
      break;
    case 'n':
    case 'N':
      player2.choosePaper();
      break;
    case 'm':
    case 'M':
      player2.chooseScissors();
      break;
    case ' ':
      startGame();
    default:
      break;
  }
});