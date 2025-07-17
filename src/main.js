import * as Phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';

class DingleberryDrop extends Phaser.Scene {
  constructor() {
    super('DingleberryDrop');
    this.score = 0;
    this.lives = 3;
  }

  preload() {
    this.load.image('banana', 'assets/banana.png');
    this.load.image('tp', 'assets/tp.png');
    this.load.image('dingleberry', 'assets/dingleberry.png');
    this.load.image('playerberry', 'assets/playerberry.png');
  }

  create() {
    const { width, height } = this.scale;

    // Title
    this.add.text(width / 2, 20, '💩 Dingle Drop', {
      fontSize: '32px',
      fill: '#fff',
      fontFamily: 'Comic Sans MS',
    }).setOrigin(0.5);

    // Score & lives
    this.scoreText = this.add.text(20, 20, 'Score: 0', {
      fontSize: '20px',
      fill: '#fff',
    });

    this.livesText = this.add.text(width - 20, 20, 'Lives: 3', {
      fontSize: '20px',
      fill: '#fff',
    }).setOrigin(1, 0);

    // Player
    this.player = this.physics.add.sprite(width / 2, height - 60, 'playerberry');
    this.player.setScale(0.1).setCollideWorldBounds(true);

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.isTouch = false;

    // Items
    this.items = this.physics.add.group();
    this.physics.add.overlap(this.player, this.items, this.catchItem, null, this);

    // Item drop loop
    this.time.addEvent({
      delay: 1000,
      callback: this.spawnItem,
      callbackScope: this,
      loop: true,
    });

    // Touch input
    this.input.on('pointermove', (pointer) => {
      this.player.x = pointer.x;
      this.isTouch = true;
    });
  }
  catchItem(player, item) {
    const type = item.texture.key;
  
    if (type === 'banana') {
      this.lives--;
      this.livesText.setText(`Lives: ${this.lives}`);
      
      if (this.lives <= 0) {
        this.scene.restart();
        return; // ✅ prevent further score logic
      }
    } else {
      this.score += 10;
      this.scoreText.setText(`Score: ${this.score}`);
    }
  
    item.destroy();
    // Add clickable "𝕏" in bottom right corner
const xLink = this.add.text(this.scale.width - 20, this.scale.height - 20, '𝕏', {
    fontSize: '28px',
    fill: '#ffffff',
    fontFamily: 'Arial',
  })
    .setOrigin(1, 1)
    .setInteractive({ useHandCursor: true });
  
  xLink.on('pointerdown', () => {
    window.open('https://x.com/Dingleonape', '_blank');
  });
  xLink.on('pointerover', () => {
    xLink.setStyle({ fill: '#00B3FF' });
  });
  xLink.on('pointerout', () => {
    xLink.setStyle({ fill: '#ffffff' });
  });
    
  }
  

  spawnItem() {
    const type = Phaser.Math.Between(0, 4) === 0 ? 'banana' : 'dingleberry';
    const x = Phaser.Math.Between(30, this.scale.width - 30);
    const item = this.items.create(x, 0, type);
    item.setScale(0.08);
    item.setVelocityY(250);
  }

  update() {
    if (!this.isTouch) {
      this.player.setVelocityX(0);
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-300);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(300);
      }
    }
  }
}

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  backgroundColor: '#1A1F2B',
  parent: 'game-container',
  scene: DingleberryDrop,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
};

new Phaser.Game(config);
