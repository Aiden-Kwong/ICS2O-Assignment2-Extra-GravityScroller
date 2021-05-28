controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    music.zapped.play()
    if (gravitytoggle == 1) {
        playerSprite.vy = 200
        gravitytoggle = 0
        playerSprite.startEffect(effects.warmRadial)
        pause(200)
        effects.clearParticles(playerSprite)
    } else {
        playerSprite.vy = -200
        gravitytoggle = 1
        playerSprite.startEffect(effects.coolRadial)
        pause(200)
        effects.clearParticles(playerSprite)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`SpikesInv`, function (sprite, location) {
    game.over(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`finishTile`, function (sprite, location) {
    game.over(true)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Spikes`, function (sprite, location) {
    game.over(false)
})
let gravitytoggle = 0
let playerSprite: Sprite = null
scene.setBackgroundColor(15)
playerSprite = sprites.create(assets.image`Player`, SpriteKind.Player)
tiles.setTilemap(tilemap`level2`)
playerSprite.setStayInScreen(true)
playerSprite.setPosition(1, 100)
playerSprite.setVelocity(100, 150)
game.splash("GravityScroller")
game.showLongText("This is GravityScroller, a sidescroller where you can't jump! Use the A button to change the direction of gravity, and don't touch the spikes!", DialogLayout.Bottom)
game.showLongText("Ready?", DialogLayout.Bottom)
forever(function () {
    if (playerSprite.vx > 0 && !(playerSprite.tileKindAt(TileDirection.Left, assets.tile`finishTile`))) {
        info.changeScoreBy(1)
        pause(100)
    }
})
forever(function () {
    scene.cameraFollowSprite(playerSprite)
})
forever(function () {
    music.playMelody("C5 B A G C5 B A G ", 200)
    music.playMelody("C5 B A B C5 B A G ", 200)
    music.playMelody("A G F E A G F E ", 200)
    music.playMelody("A G F G A G F - ", 200)
})
game.onUpdateInterval(100, function () {
    if (playerSprite.tileKindAt(TileDirection.Right, assets.tile`BasicTile`)) {
        playerSprite.vx = 0
    } else {
        playerSprite.vx = 100
    }
    if (!(playerSprite.tileKindAt(TileDirection.Top, assets.tile`BasicTile`) || playerSprite.tileKindAt(TileDirection.Bottom, assets.tile`BasicTile`))) {
        if (gravitytoggle == 0) {
            playerSprite.vy = 200
        } else {
            playerSprite.vy = -200
        }
    }
})
