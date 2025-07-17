import * as Phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600; 

class DingleberryDrop extends Phaser.Scene {
  constructor() {
    super('DingleberryDrop');
    this.score = 0;
    this.lives = 3;
  }

  preload() {
  
    this.load.image('banana', '/public/assets/tp.png');
    this.load.image('tp', '/public/assets/tp.png');
    this.load.image('dingleberry', '/public/assets/dingleberry.png');
    this.load.image('playerberry', '/public/assets/playerberry.png'); // controlled character
  }

  create() {
    this.add.text(20, 20, '💩 Dingle Drop', { fontSize: '28px', fill: '#fff' });
    this.scoreText = this.add.text(20, 60, 'Score: 0', { fontSize: '22px', fill: '#fff' });
    this.livesText = this.add.text(20, 90, 'Lives: 3', { fontSize: '22px', fill: '#fff' });
    this.player = this.physics.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT - 50, 'playerberry');

    this.player.setScale(0.2); // 👈 scale down
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.items = this.physics.add.group();
    this.physics.add.overlap(this.player, this.items, this.catchItem, null, this);

    this.time.addEvent({
      delay: 1000,
      callback: this.spawnItem,
      callbackScope: this,
      loop: true,
    });
  }

  catchItem(player, item) {
    if (item.texture.key === 'banana') {
      this.lives -= 1;
      this.livesText.setText(`Lives: ${this.lives}`);
    } else {
      this.score += 10;
      this.scoreText.setText(`Score: ${this.score}`);
    }

    item.destroy();

    if (this.lives <= 0) {
      this.scene.restart();
    }
  }

  spawnItem() {
    const itemType = Phaser.Math.Between(0, 4) === 0 ? 'banana' : 'dingleberry';
    const x = Phaser.Math.Between(50, GAME_WIDTH - 50);
    const item = this.items.create(x, 0, itemType);
    item.setScale(0.1); // 👈 scale down falling items
    item.setVelocityY(200);
  }

  update() {
    this.player.setVelocityX(0);
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#222',
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 } },
  },
  scene: DingleberryDrop,
};

new Phaser.Game(config);
