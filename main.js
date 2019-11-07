const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            //gravity: {
              //  y: 100
            //}
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
let bg1;
let bg2;
let ground;
let cam;
let flowers;
let lavender;
let lavenders;
let particles;
let pollinateEffect;

function preload () {
    this.load.image('background1', 'assets/images/back1.png');
    this.load.image('background2', 'assets/images/back.png');
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('bee', 'assets/images/bee.png');
    this.load.spritesheet('flower', 'assets/images/flower-sheet.png', {frameWidth: 96, frameHeight: 96});
    this.load.spritesheet('lavender', 'assets/images/lavenderAnim.png', {frameWidth: 96, frameHeight: 96});
    this.load.spritesheet('beeAnim', 'assets/images/beeAnim.png', {frameWidth: 128, frameHeight: 128});
    this.load.image('particle', 'assets/images/blue.png');
}

function create () {
    bg1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background1");
    bg1.setOrigin(0, 0);
    bg1.setScrollFactor(0);
    bg2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background2");
    bg2.setOrigin(0, 0);
    bg2.setScrollFactor(0);
    ground = this.add.tileSprite(0, 0, game.config.width, 96, "ground");
    ground.tileScaleX = 6;
    ground.tileScaleY = 6;
    ground.setOrigin(0, 0);
    ground.setScrollFactor(0);
    ground.y = game.config.width - ground.height;

    this.physics.add.existing(ground, false);
    ground.body.setImmovable(true);
    ground.body.setSize(10000, 96);

    bee = this.physics.add.sprite(400,304, 'beeAnim');
    flower = this.physics.add.group({key: 'flower', frameQuantity: 20});
    lavender = this.physics.add.group({key: 'lavender', frameQuantity: 20});

    flowers = new Phaser.Geom.Rectangle(0,ground.y-32,2400,0);
    lavenders = new Phaser.Geom.Rectangle(0, ground.y-32, 2400, 0);
    Phaser.Actions.RandomRectangle(flower.getChildren(), flowers);
    Phaser.Actions.RandomRectangle(lavender.getChildren(), lavenders);


    bee.setBounce(.2);
    bee.setCollideWorldBounds(false);

    this.physics.add.collider(ground, bee,);
    this.physics.add.collider(ground, flower);
    this.physics.add.collider(ground, lavender);

    particles = this.add.particles('particle');

    pollinateEffect = particles.createEmitter();
    pollinateEffect.setSpeed(200);
    pollinateEffect.setLifespan(300);
    pollinateEffect.setVisible(false);

    this.physics.add.overlap(bee, flower, pollinate, null, this);

    this.anims.create({
        key: 'flower',
        frames: this.anims.generateFrameNumbers('flower', {start: 1, end: 9}),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'lavender',
        frames: this.anims.generateFrameNumbers('lavender', {start: 1, end: 5}),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'beeLeft',
        frames: this.anims.generateFrameNumbers('beeAnim', {start: 4, end: 6}),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'beeRight',
        frames: this.anims.generateFrameNumbers('beeAnim', {start: 1, end: 2}),
        frameRate: 5,
        repeat: -1
    });

    flower.playAnimation('flower');
    lavender.playAnimation('lavender');

    keys = this.input.keyboard.addKeys('W,S,A,D');

    cam = this.cameras.main;
    cam.setBounds(0,0, game.config.width * 3, game.config.height);

    cam.startFollow(bee)
}

function update () {
    if (keys.A.isDown) {
        bee.setVelocityX(-160);
        bee.anims.play('beeLeft', true)
    }
    else if (keys.D.isDown) {
        bee.setVelocityX(160);
        bee.anims.play('beeRight', true)
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
        bee.anims.stop();
    }

    bg1.tilePositionX = cam.scrollX * .3;
    bg2.tilePositionX = cam.scrollX * .6;
    ground.tilePositionX = cam.scrollX * .5;

}

function pollinate (bee, flower) {
    pollinateEffect.setPosition(flower.x,flower.y);
    pollinateEffect.setVisible(true);
    //particles.emitParticleAt(flower.x, flower.y);
    flower.disableBody(true, true);
}

