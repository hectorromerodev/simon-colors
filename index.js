const light_blue = document.getElementById('light_blue');
const violet = document.getElementById('violet');
const orange = document.getElementById('orange');
const green = document.getElementById('green');
const btnStart = document.getElementById('btnStart');
const LAST_LEVEL = 10;

class Game {
  constructor() {
    this.init();
    this.generateSeq();
    setTimeout(this.nextLevel, 500);
  }

  init() {
    this.nextLevel = this.nextLevel.bind(this);
    this.chooseColor = this.chooseColor.bind(this);
    btnStart.classList.add('hide');
  }

  generateSeq(){
    this.seq = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4));
    this.level = 1;
    this.colors = { light_blue, violet, orange, green };
  }

  nextLevel(){
    this.subLevel = 0;
    this.showSeq();
    this.addClickEvent();
  }

  transformNumberToColor(num){
    switch(num){
      case 0:
        return 'light_blue';
      case 1:
        return 'violet';
      case 2: 
        return 'orange';
      case 3:
        return 'green';
    }
  }

  transformColorToNumber(color){
    switch(color){
      case 'light_blue':
        return 0;
      case 'violet':
        return 1;
      case 'orange': 
        return 2;
      case 'green':
        return 3;
    }
  }

  showSeq(){
    for(let i = 0; i < this.level; i++){
      const color = this.transformNumberToColor(this.seq[i]);
      setTimeout(() =>  this.paintColor(color), 1000 * i);
    }
  }

  paintColor(color){
    this.colors[color].classList.add('light');
    setTimeout(() => this.clearPaint(color), 350);
  }

  clearPaint(color){
    this.colors[color].classList.remove('light');
  }

  addClickEvent() {
    this.colors.light_blue.addEventListener('click', this.chooseColor);
    this.colors.violet.addEventListener('click', this.chooseColor);
    this.colors.orange.addEventListener('click', this.chooseColor);
    this.colors.green.addEventListener('click', this.chooseColor);
  }

  removeClickEvents() {
    this.colors.light_blue.removeEventListener('click', this.chooseColor);
    this.colors.violet.removeEventListener('click', this.chooseColor);
    this.colors.orange.removeEventListener('click', this.chooseColor);
    this.colors.green.removeEventListener('click', this.chooseColor);
  }

  chooseColor(ev){
    const colorName = ev.target.dataset.color;
    const colorNumber = this.transformColorToNumber(colorName);
    this.paintColor(colorName);
    if(colorNumber === this.seq[this.subLevel]){
      this.subLevel++;
      if(this.subLevel === this.level){
        this.level++;
        this.removeClickEvents();
        if(this.level === (LAST_LEVEL + 1)){
          // Win the game
        }else{
          setTimeout(this.nextLevel, 1500);
        }
      }
    }else{
      // Loose the game
    }
  }
}

function startGame() {
  window.game = new Game();
}