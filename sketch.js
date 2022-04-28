let music = []
let panel = 0
let panelFadeFrame = 0
let outroMusic;
let b;
let g;
let debug = false

let zoomOut = false

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

let books = []
let walk = []
let card
let paper


let gDensity = 8
let born=10

let menu = true
let end = false
let reading = false

let creditsFrame = 0
let credits = false;
let cPage = 0
let finalPanelFrame = 0
let radTest = 0;

let creditsContent = []

creditsContent[0] = [
  "Works Cited", "CDC. Injury Data Visualization Tools | WISQARS | CDC. https://wisqars.cdc.gov/data/non-fatal/home. Accessed 27 Mar. 2022.",
  "Cunningham, E. J. A., and T. R. Birkhead. “Sex Roles and Sexual Selection.” Animal Behaviour, vol. 56, no. 6, Dec. 1998, pp. 1311–21. DOI.org (Crossref), https://doi.org/10.1006/anbe.1998.0953.",
  "DiBranco, Alex. Male Supremacist Terrorism as a Rising Threat. Feb. 2020. icct.nl, https://icct.nl/publication/male-supremacist-terrorism-as-a-rising-threat/.",
  "Gesquiere, Laurence R., et al. “Life at the Top: Rank and Stress in Wild Male Baboons.” Science (New York, N.Y.), vol. 333, no. 6040, July 2011, pp. 357–60. PubMed Central, https://doi.org/10.1126/science.1207120.",
  "Kastor, Elizabeth. “IN MONTREAL, A SURVIVOR HEALS AFTER THE HORROR.” Washington Post, 11 Dec. 1989. www.washingtonpost.com, https://www.washingtonpost.com/archive/lifestyle/1989/12/11/in-montreal-a-survivor-heals-after-the-horror/e7bc530c-46b3-4077-9ed1-be83f34c98d5/.",
  "Kay, Barbara. “Lone Gunman: The Ecole Polytechnique Massacre Was a Freak Tragedy. So….” The National Post, 6 Dec. 2012, https://archive.ph/cEKv.",
  "Lakeman, Lee. “Women, Violence and the Montreal Massacre.” Vancouver Rape Relief and Women’s Shelter, 19 Apr. 2007, https://web.archive.org/web/20070419184040/http://www.rapereliefshelter.bc.ca/dec6/leearticle.html.",
  "Messerschmidt, James W. “Becoming a Super-Masculine ‘Cool Guy’: Reflexivity, Dominant and Hegemonic Masculinities, and Sexual Violence.” Boyhood Studies, vol. 13, no. 2, Dec. 2020, pp. 20–35. ProQuest, http://dx.doi.org/10.3167/bhs.2020.130203.",
  "\"Selective Service | USAGov.\” USA.Gov, https://www.usa.gov/selective-service. Accessed 27 Mar. 2022."
]
creditsContent[1] = [
  "Media Credits", "Images", 
  "--Like a Lead Baboon--", "https://nature.ca/notebooks/english/baboon.htm",
  "--Communities of Isolation--","https://psmag.com/news/what-happens-when-4chan-attacks",
  "--A Case Study: The Ecole Polytechnique--","https://www.thestar.com/news/canada/2020/12/06/right-after-the-montreal-massacre- many-wouldnt-acknowledge-that-all-the-victims-were-women-it-was-more-than-just-disbelief.html",
  "--Men of Action--","https://www.artofmanliness.com/skills/manly-know-how/don-draper-judo-unarmed- self-defense-from-the-mad-men-era/",
  "--The Standing Army--","https://www.washingtonpost.com/outlook/2019/03/12/why-propaganda-is-more-dangerous-digital-age/",
  "--Nowhere West for Conquest--","https://www.lot-art.com/auction-lots/Hiroshi-Sugimoto-b-1948/6299781-hiroshi_sugimoto_1948-02.12.20-christie",
]

creditsContent[2] = [
  "Music",
  "Vocal samples are taken from an interview with the mother of the Ecole Polytechnique shooter - \"Faith in the Midst of the Montreal Massacre\" - https://www.youtube.com/watch?v=nnyT4rXwbAc",
  "All other media made entirely by Ben Rosenberg"
]

creditsContent[3] = ['',
  "Thank you for playing."
]



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
  if (b.grounded && abs(b.vel.y) <= 1 && !credits) {
    b.vel.y = -160
    b.vel.sub(b.acc)

    if (end) {
      b.acc.mult(0)
    }
  }
}

function preload() {
  outroMusic = loadSound('EP.mp3')
  for (let i=0;i<6;i++) {
    let foo = loadSound('music/m'+i.toString()+'.mp3')
    music.push(foo)
  }
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
  for (let i=0;i<6;i++) {
    let foo = loadImage('assets/readings/read'+i.toString()+'.png')
    readings.push(foo)
  }
  quotes = shuffle(quotes)
}

function keyTyped() {
  if (key==='r' && debug) {
    console.log('reset')
    b.reset()
  } else if (key === ' ') {
    jump()
    if (reading) {
      mouseClicked()
    }
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
  if (panel < 6 && !music[panel].isPlaying() && !outroMusic.isPlaying()) {
    music[panel].loop()
    music[panel].setVolume(0)
    panelFadeFrame = frameCount
  }
  if (menu) {
    menu=false
  }
  if (reading && frameCount - readStart > 100) {
    reading = false
    readStart = 0
    for (let i=0;i<6;i++) {
      music[i].stop();
    }
    panel += 1
    if (panel < 6) {
      music[panel].loop()
      music[panel].setVolume(0)
      panelFadeFrame = frameCount
    } else {
      outroMusic.play()
    }

    if (panel >= 6) {
      end = true
      creditsFrame = frameCount + 420
      for (let bl of g.plan) {
        bl = true
      }
      g.xoff = 0
    }
  }
  if (credits) {
    cPage++
  }

  jump()

}



function draw() {
  if (panel < 6 && music[panel].isPlaying() && frameCount - panelFadeFrame < 60) {
    music[panel].setVolume((frameCount-panelFadeFrame)/60)
  }
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

  else if (reading && !end) {
    b.deadTime = frameCount 
    push();
    image(readings[panel], 0, 0, width, height)
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
        if (frameCount >= creditsFrame) {
          credits=true
        }
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

    wallx -= g.speed
    if (abs(wallx%width)<g.speed) {
      wallx=0
    }
    if (!zoomOut) {
      push();
      fill(125, 135, 160, 255*panel/endNum)
      rect(0, 0, width, height)
      pop();
    }
    
    for (let i=0;i<3;i++) {
      if (!zoomOut) {
        image(wall, wallx-width+width*i, 0, width, height)
      }
    }
    g.update();
    if (!zoomOut) {
      g.show();
    }

    if (b.pos.y < -1000 && !zoomOut) {
      b.stopped = true
      zoomOut = true
      b.r *= .3
      b.rot = PI/12
      b.pos.y = height*1.3
      b.pos.x = width*.25
      b.vel.x = 3
      b.vel.y *=.25
    }

    if (zoomOut) {
      b.vel.y *= .99
      b.vel.x *= .99
      b.r*=.99
      
    }

    if (born) {
      push();
      fill(0)
      //ellipse(b.init.x, b.init.y, born, b.r*4)
      pop();
      born--
    }

    b.collide(g)
    //b.mvmt(0)
    b.update();
    b.show();
  }

  if (credits) {
    let fade = 240
    let timing = frameCount - creditsFrame
    let softness = 255 - (timing<fade)*(fade-timing)*(255/fade)
    push();
    fill(255, 220, 230, softness)
    rect(0,0,width,height)
    pop();

    if (timing > 300) {
      push();
      textAlign(CENTER)
      textFont('Helvetica')
      let page = floor((timing-300)/900)
      if (page > cPage) {
        cPage = page
      } else {
        page =cPage
      }
      if (page > 3) {
        page = 3
      }
      if (page==3) {
        if (finalPanelFrame==0) {
          finalPanelFrame = frameCount;
        }
        let timing2 = frameCount - finalPanelFrame
        radTest = timing2
        let rad = 4*width-timing2*timing2/100
        if (rad <= 200) {
          rad = 200
          noLoop();
        }
        push();
        fill(0)
        rect(0, 0, width, height)
        fill(255, 220, 230, softness)
        circle(width/2, 60, rad)
        pop();
      }
      
      textSize(28)
      text(creditsContent[page][0], width/2, 30)
      textSize(15);
      for (let i=1;i<creditsContent[page].length;i++) {
        let line = creditsContent[page][i]
        if (true || line.length < 100) {
          let lineDiv = 60
          if (page == 1) {
            lineDiv = 40
          }
          textAlign(CENTER)
          rectMode(CENTER)
          textFont('Helvetica')
          text(line, width/2, 30+lineDiv*i, width-100, 50)
        }
        
        else if (false) {
          line = line.split(' ')
          let mid = floor(line.length/2)
          let line1 = line.slice(0,mid).join(' ')
          let line2 = line.slice(mid, line.length).join(' ')
          text(line1, width/2, 30+60*i)
          text(line2, width/2, 45 + 60*i)
        }
        
      }
      
      pop();
    }


  }
  
} 