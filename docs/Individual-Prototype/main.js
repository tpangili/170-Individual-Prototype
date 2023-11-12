title = "GHOST HUNT";

description = `
   [Tap]

 Flashlight
`;

characters = [
  `
 bbbb
bllllb
bllllb
bllllb
bllllb
 bbbb
`,
  `
 gggg
g gg g
g gg g
gggggg
gggggg
gg  gg
`,
];

const G = {
	WIDTH: 100,
	HEIGHT: 150,

  GHOST_MIN_BASE_SPEED: 1.0,
  GHOST_MAX_BASE_SPEED: 1.0,
};

//const VIEW_X = 200;
//const VIEW_Y = 200;
options = {
  //viewSize: { x: VIEW_X, y: VIEW_Y },
  theme: "pixel",
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 75,
};

/**
 * @typedef {{
* pos: Vector, angle: number
* }} Player
*/

/**
 * @typedef {{
* pos: Vector, angle: number
* }} Ghost
*/

/**
* @type { Player }
*/
let player;

/**
* @type { Ghost [] }
*/
let ghosts;

/**
 * @type { number }
 */
let currentGhostSpeed;

/**
 * @type { boolean }
 */
let isEsploded;

function update() {
  if (!ticks) {
    player = {
      pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
      angle: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5).angleTo(vec(rnd(0, G.WIDTH), rnd(0, G.HEIGHT))),
    };
    ghosts = [];
  }

  // Updating and drawing the player
  //player.pos = vec(input.pos.x, input.pos.y);
  player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
  color("black");
  char("a", player.pos);
  // Old-fashioned trigonometry to find out the velocity on each axis
  player.pos.x += G.GHOST_MIN_BASE_SPEED * Math.cos(player.angle);
  player.pos.y += G.GHOST_MIN_BASE_SPEED * Math.sin(player.angle);
  // Check whether player has reached edge
  if( player.pos.x >= G.WIDTH || player.pos.x <= 0 || player.pos.y <= 0 || player.pos.y >= (G.HEIGHT - 45) ){
    player.angle = player.pos.angleTo(vec(rnd(0, G.WIDTH), rnd(0, G.HEIGHT)))
  }

  const sp = input.pos.clamp(1, 99, 1, 99);
  const ta = player.pos.angleTo(sp);
  // Spawning enemies
  if (ghosts.length < 15) {
    currentGhostSpeed =
        rnd(G.GHOST_MIN_BASE_SPEED, G.GHOST_MAX_BASE_SPEED) * difficulty;

    const posX = rnd(0, G.WIDTH);
    //const posY = -rnd(G.HEIGHT * 0.1);
    const posY = 35;
    const position = vec(posX, posY);
    ghosts.push({
        pos: vec(posX, posY),
        angle: position.angleTo(vec(rnd(0, G.WIDTH), rnd(0, G.HEIGHT))),
    });

    //waveCount++; // Increase the tracking variable by one
  }

  // Checks collision with ghost after
  // input button pressed.
  if(input.isJustPressed){
    color("yellow");
    arc(player.pos, 4, 2, ticks * 0.03, ticks * 0.1 + PI);
    arc(player.pos, 4, 2, ticks * 0.03 + PI, ticks * 0.1 + PI * 2);
  }

  // Handles ghost behavior
  remove(ghosts, (e) => {
    e.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
    // Old-fashioned trigonometry to find out the velocity on each axis
    e.pos.x += G.GHOST_MIN_BASE_SPEED * Math.cos(e.angle);
    e.pos.y += G.GHOST_MIN_BASE_SPEED * Math.sin(e.angle);
    color("black");
    // Shorthand to check for collision against another specific type
    // Also draw the sprite
    const isCollidingWithLight = char("b", e.pos).isColliding.char.a;
    isEsploded = false;

    // Check whether to make a small particle explosin at the position
    if (isCollidingWithLight && input.isJustPressed) {
        color("green");
        particle(e.pos);
        play("explosion");
        addScore(10);
        isEsploded = true;
    }
    if (!isCollidingWithLight && input.isJustPressed) {
      e.angle = -e.pos.angleTo(player.pos)
    }

    // Check whether ghost has reached edge
    if( e.pos.x >= G.WIDTH || e.pos.x <= 0 || e.pos.y <= 0 || e.pos.y >= (G.HEIGHT - 45)){
      e.angle = e.pos.angleTo(vec(rnd(0, G.WIDTH), rnd(0, G.HEIGHT)));
    }

    // Also another condition to remove the object
    return (isEsploded);
  });
}
