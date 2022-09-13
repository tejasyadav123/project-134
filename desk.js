status = ""
objects = []

function preload() {
    img = loadImage("desk.jpg")
}

function setup() {
    canvas = createCanvas(640, 450)
    canvas.center()

    objectDetector = ml5.objectDetector("cocossd", modelloaded)
    document.getElementById("status").innerHTML = "Status : detectig objects"
}

function draw() {
    image(img, 0, 0, 640, 450)

    if (status != "") {
        for (i = 0; i < objects.length; i++) {

            document.getElementById("status").innerHTML = "Status : objects detected "
            document.getElementById("number_of_objects").innerHTML = "number of objects : " + objects.length

            fill("red")
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y)
            noFill()
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

        }
    }
}

function modelloaded() {
    status = true
    objectDetector.detect(img, gotresult)
}

function gotresult(error, result) {
    if (error) {
        console.log(error)
    } else {
        console.log(result)
        objects = result
    }
}