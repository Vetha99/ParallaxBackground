const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d")

const CANVAS_WIDTH = canvas.width = 800
const CANVAS_HEIGHT = canvas.height = 700

let gameSpeed = 5
const slider = document.getElementById("slider")
slider.value = gameSpeed
const showGameSpeed = document.getElementById("showGameSpeed")
showGameSpeed.innerHTML = gameSpeed
slider.addEventListener("change", function(e){
    gameSpeed = e.target.value
    showGameSpeed.innerHTML = e.target.value
})

class Layer{
    constructor(imageSrc,speedModifier){
        this.imageLayer = new Image()
        this.imageLayer.src = imageSrc
        this.speedModifier = speedModifier
        this.x = 0
        this.width = 2400
        this.x2 = this.width
    }
    update(gameSpeed){
        const speed = gameSpeed*this.speedModifier
        if (this.x<-this.width) this.x = this.width + this.x2 - speed
        else this.x-= speed
        if (this.x2<-this.width) this.x2 = this.width + this.x - speed
        else this.x2-=speed
    }
    
    draw(ctx){
        ctx.drawImage(this.imageLayer, this.x, 0); 
        ctx.drawImage(this.imageLayer, this.x2, 0); 
    }
}

const backgroundLayer1 = new Layer("layer-1.png",0.2)
const backgroundLayer2 = new Layer("layer-2.png",0.4)
const backgroundLayer3 = new Layer("layer-3.png",0.6)
const backgroundLayer4 = new Layer("layer-4.png",0.8)
const backgroundLayer5 = new Layer("layer-5.png",1)

const backgroundLayers = [backgroundLayer1,backgroundLayer2,backgroundLayer3,backgroundLayer4,backgroundLayer5]

function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    backgroundLayers.forEach(backgroundLayer => {
        backgroundLayer.update(gameSpeed)
        backgroundLayer.draw(ctx)
    });
    requestAnimationFrame(animate)
}
animate()