namespace SpriteKind {
    export const Lava = SpriteKind.create()
    export const moneda = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, img`
    ........................
    ........................
    ........................
    ..........ffff..........
    ........ff1111ff........
    .......fb111111bf.......
    .......f1111111dbf......
    ......fd1111111ddf......
    ......fd111111dddf......
    ......fd111ddddddf......
    ......fd111ddddddf......
    ......fd1dddddddbf......
    ......fd1dfbddbbff......
    ......fbddfcdbbcf.......
    .....ffffccddbfff.......
    ....fcb1bbbfcffff.......
    ....f1b1dcffffffff......
    ....fdfdf..ffffffffff...
    .....f.f.....ffffff.....
    ........................
    ........................
    ........................
    ........................
    ........................
    `, function (sprite, location) {
    info.changeCountdownBy(-2)
    makelevel()
})
function makelevel () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    list = [
    tilemap`level15`,
    tilemap`level14`,
    tilemap`level16`,
    tilemap`level17`,
    tilemap`level0`,
    tilemap`level26`
    ]
    tiles.setCurrentTilemap(list[levelnub])
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile6`)
    for (let value of tiles.getTilesByType(assets.tile`myTile0`)) {
        e = sprites.create(img`
            ........................
            ........................
            ........................
            ..........ffff..........
            ........ff1111ff........
            .......fb111111bf.......
            .......f1111111dbf......
            ......fd1111111ddf......
            ......fd111111dddf......
            ......fd111ddddddf......
            ......fd111ddddddf......
            ......fd1dddddddbf......
            ......fd1dfbddbbff......
            ......fbddfcdbbcf.......
            .....ffffccddbfff.......
            ....fcb1bbbfcffff.......
            ....f1b1dcffffffff......
            ....fdfdf..ffffffffff...
            .....f.f.....ffffff.....
            ........................
            ........................
            ........................
            ........................
            ........................
            `, SpriteKind.Enemy)
        tiles.placeOnTile(e, value)
        e.ay = 500
        e.vx = 50
    }
    tileUtil.coverAllTiles(assets.tile`myTile0`, assets.tile`myTile4`)
    tileUtil.coverAllTiles(sprites.builtin.brick, assets.tile`myTile4`)
    tileUtil.coverAllTiles(sprites.builtin.forestTiles0, assets.tile`myTile4`)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(assets.image`myImage`)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -200
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    info.changeCountdownBy(-2)
    makelevel()
})
info.onCountdownEnd(function () {
    game.gameOver(false)
    game.setGameOverMessage(false, "The Time")
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.darkGroundNorthWest1, function (sprite, location) {
    game.gameOver(true)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleBlueCrystal, function (sprite, location) {
    levelnub += -1
    info.changeCountdownBy(10)
    makelevel()
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    levelnub += 1
    info.changeCountdownBy(10)
    makelevel()
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestOpen, function (sprite, location) {
    info.changeCountdownBy(3)
    makelevel()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    makelevel()
})
let e: Sprite = null
let list: tiles.TileMapData[] = []
let levelnub = 0
let mySprite: Sprite = null
game.setGameOverEffect(false, effects.hearts)
game.setGameOverPlayable(false, music.stringPlayable("C G A E F D E C ", 100), true)
info.startCountdown(40)
scene.setBackgroundImage(img`
    ffffffffffffffffffffffff
    ffffffffffffffffffffffff
    fffffffffffffff11fffffff
    fff11ffff1f1fff11fffffff
    fff1f1ffff1fffffffffffff
    fff11fffff1fffffffffffff
    fff1f1ffff1ffff11fffffff
    fff111ffff1ffff11fffffff
    ffffffffffffffffffffffff
    ffffffffffffffffffffffff
    11fff11fff11ff111ff11fff
    1f1f1ff1f1ff1ff1ff1ff1ff
    11ff1ff1f111fff1ff1111ff
    1f1f1ff1f1f1fff1ff1ff1ff
    111ff11ff1ff1f11ff1ff1ff
    ffffffffffffffffffffffff
    ffffffffffffffffffffffff
    ffffffffffffffffffffffff
    ffffffffffffffffffffffff
    ffffffffffffffffffffffff
    ffffffffffffffffffffffff
    ffffffffffffffffffffffff
    ffffffffffffffffffffffff
    ffffffffffffffffffffffff
    `)
mySprite = sprites.create(assets.image`myImage`, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 0)
mySprite.ay = 500
scene.cameraFollowSprite(mySprite)
levelnub = 0
characterAnimations.loopFrames(
mySprite,
[img`
    e e e . . . . e e e . . . . 
    c d d c . . c d d c . . . . 
    c b d d f f d d b c . . . . 
    c 3 b d d b d b 3 c . . . . 
    f b 3 d d d d 3 b f . . . . 
    e d d d d d d d d e . . . . 
    e d f d d d d f d e . b f b 
    f d d f d d f d d f . f d f 
    f b d d b b d d 2 f . f d f 
    . f 2 2 2 2 2 2 b b f f d f 
    . f b d d d d d d b b d b f 
    . f d d d d d b d d f f f . 
    . f d f f f d f f d f . . . 
    . f f . . f f . . f f . . . 
    `,img`
    . . . . . . . . . . . . . . 
    e e e . . . . e e e . . . . 
    c d d c . . c d d c . . . . 
    c b d d f f d d b c . . . . 
    c 3 b d d b d b 3 c . . . . 
    f b 3 d d d d 3 b f . . . . 
    e d d d d d d d d e . . . . 
    e d f d d d d f d e b f b . 
    f d d f d d f d d f f d f . 
    f b d d b b d d 2 b f d f . 
    . f 2 2 2 2 2 2 d b d b f . 
    . f d d d d d d d f f f . . 
    . f d b d f f f d f . . . . 
    . . f f f f . . f f . . . . 
    `,img`
    . . . . . . . . . . . . . . 
    e e e . . . . e e e . . . . 
    c d d c . . c d d c . . . . 
    c b d d f f d d b c . . . . 
    c 3 b d d b d b 3 c . . . . 
    f b 3 d d d d 3 b f . . . . 
    e d d d d d d d d e . . . . 
    e d f d d d d f d e . b f b 
    f d d f d d f d d f . f d f 
    f b d d b b d d 2 b f f d f 
    . f 2 2 2 2 2 2 d b b d b f 
    . f d d d d d d d f f f f . 
    . . f d b d f d f . . . . . 
    . . . f f f f f f . . . . . 
    `],
100,
characterAnimations.rule(Predicate.MovingLeft, Predicate.HittingWallDown)
)
characterAnimations.loopFrames(
mySprite,
[img`
    . . . . e e e . . . . e e e 
    . . . . c d d c . . c d d c 
    . . . . c b d d f f d d b c 
    . . . . c 3 b d b d d b 3 c 
    . . . . f b 3 d d d d 3 b f 
    . . . . e d d d d d d d d e 
    b f b . e d f d d d d f d e 
    f d f . f d d f d d f d d f 
    f d f . f 2 d d b b d d b f 
    f d f f b b 2 2 2 2 2 2 f . 
    f b d b b d d d d d d b f . 
    . f f f d d b d d d d d f . 
    . . . f d f f d f f f d f . 
    . . . f f . . f f . . f f . 
    `,img`
    . . . . . . . . . . . . . . 
    . . . . e e e . . . . e e e 
    . . . . c d d c . . c d d c 
    . . . . c b d d f f d d b c 
    . . . . c 3 b d b d d b 3 c 
    . . . . f b 3 d d d d 3 b f 
    . . . . e d d d d d d d d e 
    . b f b e d f d d d d f d e 
    . f d f f d d f d d f d d f 
    . f d f b 2 d d b b d d b f 
    . f b d b d 2 2 2 2 2 2 f . 
    . . f f f d d d d d d d f . 
    . . . . f d f f f d b d f . 
    . . . . f f . . f f f f . . 
    `,img`
    . . . . . . . . . . . . . . 
    . . . . e e e . . . . e e e 
    . . . . c d d c . . c d d c 
    . . . . c b d d f f d d b c 
    . . . . c 3 b d b d d b 3 c 
    . . . . f b 3 d d d d 3 b f 
    . . . . e d d d d d d d d e 
    b f b . e d f d d d d f d e 
    f d f . f d d f d d f d d f 
    f d f f b 2 d d b b d d b f 
    f b d b b d 2 2 2 2 2 2 f . 
    . f f f f d d d d d d d f . 
    . . . . . f d f d b d f . . 
    . . . . . f f f f f f . . . 
    `],
100,
characterAnimations.rule(Predicate.MovingRight, Predicate.HittingWallDown)
)
characterAnimations.runFrames(
mySprite,
[img`
    e e e . . . . e e e . . . . 
    c d d c . . c d d c . . . . 
    c b d d f f d d b c . . . . 
    c 3 b d d b d b 3 c . . . . 
    f b 3 d d d d 3 b f . . . . 
    e d d d d d d d d e . . . . 
    e d f d d d d f d e . b f b 
    f d d f d d f d d f . f d f 
    f b d d b b d d 2 f . f d f 
    . f 2 2 2 2 2 2 b b f f d f 
    . f b d d d d d d b b d b f 
    . f d d d d d b d d f f f . 
    . f d f f f d f f d f . . . 
    . f f . . f f . . f f . . . 
    `],
500,
characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft)
)
characterAnimations.runFrames(
mySprite,
[img`
    . . . . e e e . . . . e e e 
    . . . . c d d c . . c d d c 
    . . . . c b d d f f d d b c 
    . . . . c 3 b d b d d b 3 c 
    . . . . f b 3 d d d d 3 b f 
    . . . . e d d d d d d d d e 
    b f b . e d f d d d d f d e 
    f d f . f d d f d d f d d f 
    f d f . f 2 d d b b d d b f 
    f d f f b b 2 2 2 2 2 2 f . 
    f b d b b d d d d d d b f . 
    . f f f d d b d d d d d f . 
    . . . f d f f d f f f d f . 
    . . . f f . . f f . . f f . 
    `],
500,
characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight)
)
makelevel()
forever(function () {
    music.play(music.stringPlayable("C D F E E E F C ", 150), music.PlaybackMode.UntilDone)
})
forever(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))) {
            e.vx = 50
        } else if (tiles.tileAtLocationIsWall(value.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))) {
            e.vx = -50
        }
    }
})
