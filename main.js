const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let bee;
let flower;
let keys;

function preload () {
    this.load.image('background', 'assets/images/back.png');
    this.load.image('bee', 'assets/images/bee.png');
    this.load.spritesheet('flower', 'assets/images/flower-sheet.png', {frameWidth: 96, frameHeight: 96});
}

function create () {
    this.add.image(400,400, 'background');

    bee = this.physics.add.sprite(400,304, 'bee');
    flower = this.physics.add.group({key: 'flower', frameQuantity: 50});

    let rect = new Phaser.Geom.Rectangle(0,700,800,100);

    Phaser.Actions.RandomRectangle(flower.getChildren(), rect);

    bee.setCollideWorldBounds(true);
    bee.setBounce(2);

    this.physics.add.collider(bee);

    this.anims.create({
        key: 'flower',
        frames: this.anims.generateFrameNumbers('flower', {start: 1, end: 9}),
        frameRate: 5,
        repeat: -1
    });

    flower.playAnimation('flower');
    keys = this.input.keyboard.addKeys('W,S,A,D');
}

function update () {
    if (keys.A.isDown) {
        bee.setVelocityX(-160);
    }
    else if (keys.D.isDown) {
        bee.setVelocityX(160);
    }
    else if (keys.W.isDown) {
        bee.setVelocityY(-160);
    }
    else if (keys.S.isDown) {
        bee.setVelocityY(160);
    }
    else {
        bee.setVelocityY(0);
        bee.setVelocityX(0);
    }
}

