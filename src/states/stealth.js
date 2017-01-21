import playStateFactory from './_play'
const lorem = ["Food truck church-key master cleanse, succulents brunch forage cold-pressed pok pok lo-fi twee organic banjo. Shoreditch blue bottle cliche austin biodiesel four loko. Fam PBR&B cliche kinfolk forage, lo-fi chambray bicycle rights gochujang kickstarter fashion axe bitters church-key 90's iPhone. XOXO synth meditation, aesthetic tumeric stumptown unicorn normcore blog 3 wolf moon try-hard offal pok pok you probably haven't heard of them. Knausgaard lo-fi live-edge whatever. Freegan sriracha chartreuse, synth iPhone succulents fanny pack vinyl live-edge mumblecore tacos. Bushwick poke cliche roof party, snackwave chillwave venmo fingerstache paleo portland enamel pin vape meditation jianbing."]
const bacon = ["Bacon ipsum dolor amet swine short ribs biltong, ham hock bresaola tri-tip ball tip tail. Tri-tip doner strip steak chicken hamburger rump drumstick ham hock sirloin beef cow pork loin turducken meatloaf. Ham shank ball tip fatback t-bone doner ham hock. Corned beef fatback swine ham hock pork belly pork chop. Jowl pork pork belly, shankle pastrami biltong kielbasa. Fatback drumstick boudin, bresaola meatloaf picanha short loin cupim filet mignon."]

const nonPlayers = [
  [5, 5, [2, 2, 2, 2, 1, 1, 3, 3, 3, 3, 0, 0], bacon],
  [6, 8, [1, 2, 3, 0], lorem],
]

export default playStateFactory({
  tilemap: 'stealth',
  exit: 'node',
  create: (game) => {
    game.nonPlayerManager.createEntities(nonPlayers)
  },
  update: (game) => {
  },
})
