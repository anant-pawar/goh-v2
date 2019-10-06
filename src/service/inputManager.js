import Options from '../core/options'
var options = Options();
export function init(game) {
    game.input.on("pointerdown", function () {
        if (
            game.player.body.touching.down ||
            (game.playerJumps > 0 && game.playerJumps < gameOptions.jumps)
        ) {
            if (game.player.body.touching.down) {
                game.playerJumps = 0;
            }
            game.player.setVelocityY(gameOptions.jumpForce * -1);
            game.playerJumps++;

            // stops animation
            game.player.anims.stop();
        }
    }, game);

}
export function update(game, player) {
    var cursors = game.input.keyboard.createCursorKeys();
    if (cursors.up.isDown) {
        player.setVelocityY(options.jumpForce * -1);
    }
}