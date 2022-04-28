class Boy {
    constructor(x, y, r) {
        this.pos = createVector(x, y)
        this.vel = createVector(0, 0)
        this.acc = createVector(0, 1)
        this.r = r
        this.grounded = false
        this.alive = true
        this.stopped = false
        this.init = createVector(x, y)
        this.walk = 0
        this.cycleF = 10
        this.bounce = 2
        this.width = 10
        this.fallBounds = [];
        this.deadTime = -1;
        this.rot = 0
    }

    reset() {
        this.pos = createVector(this.init.x, height-10)
        this.vel = createVector(0, -100)
        if (end) {
            //this.acc.y = 0
        }
        this.alive = true
        this.fallBounds = []
        this.deadTime = -1
        this.rot=0
        fallCount++
    }

    update() {
        if (this.alive) {
            this.vel.add(this.acc)
            this.pos.add(this.vel)
            if (this.vel.y < -0.1 && !zoomOut) {
                this.vel.limit(15)
            }
            //this.vel.x *= 0.8

        } else {
            if (frameCount - this.deadTime > 30) {
                this.reset()
            }
        }
        
        if (this.pos.y > height + 10*this.r && this.alive && !end) {
            this.alive = false
            this.deadTime = frameCount
            readStart = frameCount
            reading = true
        }
        if (frameCount % this.cycleF==0 && this.grounded) {
            this.walk = (this.walk+1)%4
        }
        if (abs(this.vel.x) < 0.1) {
            //this.walk = 1
            //this.pos.x -= g.speed
        }

        if (this.fallBounds.length) {
            if (this.pos.x < g.xoff + this.fallBounds[0] || this.pos.x > g.xoff + this.fallBounds[1]) {
                
                

            }
        }

    }

    collide(g) {
        if ((g.support(this.pos.x-this.width/2) || g.support(this.pos.x+this.width/2)) && this.alive && !zoomOut) {
            //console.log('boing')
            let y = height-g.thickness+5
            let cross = y - this.pos.y - this.r - 1
            if (cross <= 1 && cross >= -g.thickness) {
                this.vel.sub(this.acc)
                this.vel.y = abs(this.vel.y) * -(this.bounce/10)
                this.pos.y += cross + 1
                this.grounded = true
            } else {
                this.grounded = false
            }
        } else {
            let y = height-g.thickness+5
            let cross = y - this.pos.y - this.r - 1
            if (cross < -15) {
                this.fallBounds = g.bound(this.pos.x)
            }
            
        }
    }

    mvmt(speed=1) {
        let diff = (mouseX - this.pos.x)/100
        this.vel.x += speed*diff
        
    }

    show() {
        let drift = sin(PI/2+frameCount/10)*this.grounded
        if (this.stopped) {
            drift = 0
        }
        push();
        translate(this.pos.x-60, this.pos.y-150+drift)
        if (!this.stopped) {
            rotate(PI/360*sin(frameCount/10)*this.grounded + this.rot)

        }
        fill(255, 0, 0)
        stroke(0)
        strokeWeight(1)
        //circle(0, 0, 2*this.r)
        image(walk[this.walk], 0, 0, 2*this.r, 4*this.r)
        pop();
    }

}