let music;
let b;
let g;

let w = 800
let sprite
let wall
let walls = []
let wallx=0
let bgx=0
let bgv=0
let sky=0

let fallCount=0
let endNum = 6

let quotes = []
let qBuffer
let qStep = 0

let readings = []
let readStart = 0
let rStep = 0

let books = []
let walk = []
let card
let paper


let gDensity = 8
let born=10

let menu = true
let end = false
let reading = false


//let locString = '1111111101010101'
let locString = '1111111'
for (let i=0;i<30;i++) {
  let x = Math.floor(Math.random()*gDensity)
  if (x>1) {
    x=1
  }
  locString += x.toString()
}

function jump() {
  if (b.grounded && abs(b.vel.y) <= 1 && !end) {
    b.vel.y = -160
    b.vel.sub(b.acc)
  }
}

function preload() {
  music = loadSound('EP.mp3')
  wall  = loadImage('assets/wall1.png')
  sky = loadImage('assets/sky.png')
  sprite = loadImage('assets/boy/bRest.png')
  card = loadImage('assets/card.jpg')
  paper = loadImage('assets/paper.jpg')
  
  for (let i=0;i<5;i++) {
    let foo = loadImage('assets/ground/gBooks'+i.toString()+'.png')
    books.push(foo)
  }
  for (let i=0;i<4;i++) {
    let foo = loadImage('assets/boy/bWalk'+i.toString()+'.png')
    walk.push(foo)
  }
  for (let i=0;i<7;i++) {
    let foo = loadImage('assets/quotes/view'+i.toString()+'.png')
    quotes.push(foo)
  }
  for (let i=1;i<2;i++) {
    let foo = loadImage('assets/readings/read'+i.toString()+'.png')
    readings.push(foo)
  }
  quotes = shuffle(quotes)
}

function keyTyped() {
  if (key==='r') {
    console.log('reset')
    b.reset()
  } else if (key === ' ') {
    jump()
  }
}


function setup() {
  cnv = createCanvas(w, w*0.75);
  b_init = createVector(width/2, height/2)

  b = new Boy(width/2, height/2, width/12)
  g = new Ground(locString, gDensity)
  g.block = b.r*2
}

function mouseClicked() {
  if (!music.isPlaying()) {
    //music.play()
  }
  if (menu) {
    menu=false
  }
  if (reading && frameCount - readStart > 100) {
    reading = false
    readStart = 0

    if (fallCount >= endNum) {
      end = true
      for (let bl of g.plan) {
        bl = true
      }
      g.xoff = 0
    }
  }
  jump()

}



function draw() {
  if (menu) {
    push();
    image(paper, 0, 0, width, height, 20, 0, 700, 800)
    translate(width/2, height/2)
    rectMode(CENTER)
    noStroke()
    fill(82, 22, 22, 35)
    rect(0, 0, card.width/2+1, card.height/2+1)
    imageMode(CENTER)
    image(card, 0, 0, card.width/2, card.height/2)
    
    pop();
  }

  else if (reading) {
    b.deadTime = frameCount 
    push();
    image(readings[0], 0, 0, width, height)
    pop();
  }


  else {
    //background(200)

    
    image(sky, 0, 0, width, height)

    if (!end) {
      image(quotes[qStep], bgx, 0, quotes[qStep].width, height, 0, 0, quotes[qStep].width, height)
      bgx -= g.speed
      let d = quotes[qStep].width + bgx

      if (d <= width) {
        qBuffer = quotes[qStep+1]
        image(quotes[qStep+1], d, 0, width, height, 0, 0, width, height)
      } if (d <= 0) {
        qStep += 1
        if (qStep >= quotes.length-2) {
          qStep = 0
          quotes = shuffle(quotes)
          quotes[0] = qBuffer
        }
        bgx = d
      }
    } else {
      if (g.speed > 0 && frameCount%20==0) {
        g.speed*=.8
        b.cycleF*1.01
        //console.log(b.cycleF)
      } if (g.speed < .2) {
        g.speed=0
        b.cycleF=99999999
        b.walk=1
        b.stopped = true
      }
    }

    push();
    fill(150, 200, 220, 255*fallCount/endNum)
    rect(0, 0, width, height)
    pop();
    

    wallx -= g.speed
    if (abs(wallx%width)<g.speed) {
      wallx=0
    }
    for (let i=0;i<3;i++) {
      image(wall, wallx-width+width*i, 0, width, height)
    }
    g.update();
    g.show();

    if (born) {
      push();
      fill(0)
      //ellipse(b.init.x, b.init.y, born, b.r*4)
      pop();
      born--
    }


    b.collide(g)
    b.mvmt(0)
    b.update();
    b.show();
  }
  
} 
