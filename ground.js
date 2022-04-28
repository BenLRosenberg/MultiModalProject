class Ground {
    constructor(locString, gDensity) {
        this.plan = []
        for (let i=0;i<locString.length;i++) {
            this.plan.push(parseInt(locString[i]))
        }
        this.xoff = 0
        this.block = width/8
        this.speed = 7
        this.density = gDensity
        this.thickness = width/20
    }

    update() {
        if (frameCount / 540 == 0) {
            this.speed += 1
        }
        this.xoff -= this.speed
        let l = this.plan.length
        if (-this.xoff > this.block*(l-8)) {
            for (let i=0;i<l;i++) {
                let x = floor(random(this.density))
                this.plan.push(Boolean(x))
            }
            this.xoff += 5*this.block
            this.plan = this.plan.slice(5, this.plan.length)
        }
    }

    support(x) {
        let closest = floor((x-this.xoff)/this.block)
        return Boolean(this.plan[closest])||end
    }

    bound(x) {
        let closest = floor((x-this.xoff)/this.block)
        return [closest*this.block, (closest+1)*this.block]
    }

    show() {
        for (let i=0;i<this.plan.length;i++) {
            if (this.plan[i] || end) {
                push();
                translate(this.xoff + i*this.block, height-this.thickness)
                fill(0)
                strokeWeight(0)
                rect(0, 0, this.block, this.thickness)
                image(books[i%5], 0, 0, this.block, this.thickness, 0, 0, books[0].width, books[0].height/2)
                pop();
            }
        }
    }
}