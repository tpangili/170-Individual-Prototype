title = "GHOST HUNT";

description = `
  [Click]

 Flashlight
`;

characters = [
  `
 yy
ylly
ylly
 yy
`,
];

const G = {
	WIDTH: 100,
	HEIGHT: 150,
};

//const VIEW_X = 200;
//const VIEW_Y = 200;
options = {
  //viewSize: { x: VIEW_X, y: VIEW_Y },
  theme: "pixel",
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 81,
};

/**
 * @typedef {{
* pos: Vector,
* }} Player
*/

/**
* @type { Player }
*/
let player;

function update() {
  if (!ticks) {
    player = {
      pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
    };
  }

  // Updating and drawing the player
  player.pos = vec(input.pos.x, input.pos.y);
  player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);

  color("black");
  char("a", player.pos);

  //color("light_yellow");
  //arc(player.pos, 4, 2, ticks * 0.03, ticks * 0.1 + PI);
  //arc(player.pos, 4, 2, ticks * 0.03 + PI, ticks * 0.1 + PI * 2);

  if(input.isJustPressed){
    color("light_yellow");
    arc(player.pos, 4, 2, ticks * 0.03, ticks * 0.1 + PI);
    arc(player.pos, 4, 2, ticks * 0.03 + PI, ticks * 0.1 + PI * 2);
  }
}
