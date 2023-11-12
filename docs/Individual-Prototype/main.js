title = "GHOST HUNT";

description = `
  [Click]

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
  //isPlayingBgm: true,
  //isReplayEnabled: true,
  //seed: 80,
};

/**
 * @typedef {{
* pos: Vector,
* }} Player
*/

/**
 * @typedef {{
* pos: Vector,
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
    };
    ghosts = [];
  }

  // Spawning enemies
  if (ghosts.length < 10) {
    currentGhostSpeed =
        rnd(G.GHOST_MIN_BASE_SPEED, G.GHOST_MAX_BASE_SPEED) * difficulty;

    const posX = rnd(0, G.WIDTH);
    const posY = -rnd(G.HEIGHT * 0.1);
    ghosts.push({
        pos: vec(posX, posY) 
    });

    //waveCount++; // Increase the tracking variable by one
  }

  // Updating and drawing the player
  player.pos = vec(input.pos.x, input.pos.y);
  player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
  color("black");
  char("a", player.pos);

  //color("black");
  //char("b", ghost.pos);

  // Checks collision with ghost after
  // input button pressed.
  if(input.isJustPressed){
    color("yellow");
    arc(player.pos, 4, 2, ticks * 0.03, ticks * 0.1 + PI);
    arc(player.pos, 4, 2, ticks * 0.03 + PI, ticks * 0.1 + PI * 2);
    /*if(char("b", ghost.pos).isColliding.char.a){
      color("green");
      particle(ghost.pos);
      play("explosion");
      addScore(10);
      //remove(ghost);
    }*/
  }

  remove(ghosts, (e) => {
    e.pos.y += currentGhostSpeed;
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

    // Also another condition to remove the object
    return (isEsploded || e.pos.y > G.HEIGHT);
  });
}
