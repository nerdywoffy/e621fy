let manifest = {
    pleaseLoad: false,
    image: null
}

function preload() {

}
function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('#canvas');
}


function draw() {
    if (manifest.pleaseLoad == true) {
        if (manifest.image !== null) {
            img = loadImage(manifest.image);

            setTimeout(() => {
                const aspc = img.width / img.height
                console.log(aspc)
                if(img.height > height) {
                    image(img, 0, 0, img.width * aspc, 800);
                }else {
                    image(img, 0, 0, img.width, img.height);
                }
                loadPixels();
                const arrayOfItem = []
                for (let i = 0; i < pixels.length; i += 4) {
                    const RED = pixels[i]
                    const GREEN = pixels[i + 1]
                    const BLUE = pixels[i + 2]
                    const ALPHA = pixels[i + 3]

                    let DATA_1 = 0
                    let DATA_2 = 0
                    let DATA_3 = 0
                    let DATA_4 =  (255 - RED) + (255 - GREEN) + (255 - BLUE) + 30
                    let DATA_TEMP = 0

                    if (RED > 1) {
                        DATA_1 = DATA_1 + (RED - 1);
                    }
                    else {
                        DATA_1 = DATA_1 + (1 - RED);
                    }

                    if (GREEN > 46) {
                        DATA_1 = DATA_1 + (GREEN - 1);
                    }
                    else {
                        DATA_1 = DATA_1 + (1 - GREEN);
                    }

                    if (BLUE > 87) {
                        DATA_1 = DATA_1 + (BLUE - 87);
                    }
                    else {
                        DATA_1 = DATA_1 + (1 - BLUE);
                    }

                    if (RED > 252) {
                        DATA_2 = DATA_2 + (RED - 252);
                    }
                    else {
                        DATA_2 = DATA_2 + (252 - RED);
                    }

                    if (GREEN > 179) {
                        DATA_2 = DATA_2 + (GREEN - 179);
                    }
                    else {
                        DATA_2 = DATA_2 + (179 - GREEN);
                    }

                    if (BLUE > 40) {
                        DATA_2 = DATA_2 + (BLUE - 40);
                    }
                    else {
                        DATA_2 = DATA_2 + (40 - BLUE);
                    }

                    if (RED > 0) {
                        DATA_3 = DATA_3 + (RED - 0);
                    }
                    else {
                        DATA_3 = DATA_3 + (0 - RED);
                    }

                    if (GREEN > 73) {
                        DATA_3 = DATA_3 + (GREEN - 73);
                    }
                    else {
                        DATA_3 = DATA_3 + (73 - GREEN);
                    }

                    if (BLUE > 150) {
                        DATA_3 = DATA_3 + (BLUE - 150);
                    }
                    else {
                        DATA_3 = DATA_3 + (150 - BLUE);
                    }

                    DATA_TEMP = DATA_1;
                    if (DATA_TEMP > DATA_2) {
                        DATA_TEMP = DATA_2;
                    }
                    if (DATA_TEMP > DATA_3) {
                        DATA_TEMP = DATA_3;
                    }
                    if (DATA_TEMP > DATA_4) {
                        DATA_TEMP = DATA_4;
                    }
                    if (DATA_TEMP == DATA_1) {
                        const newPixel = color(1, 46, 87);
                        pixels[i] = red(newPixel)
                        pixels[i + 1] = green(newPixel)
                        pixels[i + 2] = blue(newPixel)
                    }
                    else if (DATA_TEMP == DATA_2) {
                        const newPixel = color(252, 179, 40);
                        pixels[i] = red(newPixel)
                        pixels[i + 1] = green(newPixel)
                        pixels[i + 2] = blue(newPixel)
                    }
                    else if (DATA_TEMP == DATA_3) {
                        const newPixel = color(0, 73, 150);
                        pixels[i] = red(newPixel)
                        pixels[i + 1] = green(newPixel)
                        pixels[i + 2] = blue(newPixel)
                    }
                    else {
                        const newPixel = color(255, 255, 255);
                        pixels[i] = red(newPixel)
                        pixels[i + 1] = green(newPixel)
                        pixels[i + 2] = blue(newPixel)
                    }
                    arrayOfItem.push({ DATA_1, DATA_2, DATA_3, DATA_4, DATA_TEMP })
                }

                console.log('Done')
                console.log(arrayOfItem)
                updatePixels();
            }, 500)

            manifest.pleaseLoad = false
        }
    }
}

new Vue({
    el: '#app',
    data: {
        manifestImg: null
    },
    methods: {
        processImage: function () {
            if (typeof this.$refs.userinput.files[0] !== 'undefined') {
                const blobUrl = URL.createObjectURL(this.$refs.userinput.files[0])
                this.manifestImg = blobUrl
                manifest.image = blobUrl;
                manifest.pleaseLoad = true;
            }
        },
        reset: function () {
            redraw()
        }
    }
});