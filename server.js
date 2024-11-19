// Run program in dev mode with nodemon: [nodemon server.js]
// Run program for production: [node server.js]
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const games = [
  { img: "fortnite.jpg", alt: "Fortnite" },
  { img: "valorant.jpg", alt: "Valorant" },
  { img: "clashRoyale.jpg", alt: "Clash Royale" },
  { img: "2XKO.png", alt: "2XKO" },
  { img: "Aether.jpg", alt: "Aether" },
  { img: "brawlhalla.jpg", alt: "Brawlhalla" },
  { img: "brawlstars.jpg", alt: "Brawl Stars" },
  { img: "COD6.jpg", alt: "Black Ops 6" },
  { img: "csgo.jpg", alt: "Counter Strike" },
  { img: "DBFZ.jpg", alt: "Dragon Ball Fighterz" },
  { img: "granblue.jpg", alt: "Granblue" },
  { img: "guiltyGear.png", alt: "Guilty Gear Strive" },
  { img: "haloinfinite.jpg", alt: "Halo Infinite" },
  { img: "streetFighter.png", alt: "Street Fighter 6" },
  { img: "rocketLeague.jpg", alt: "Rocket League" },
  { img: "rainbow6.png", alt: "Rainbow Six Siege" },
  { img: "KOF.jpg", alt: "King of Fighters" },
  { img: "masterDuel.jpg", alt: "Master Duel" },
  { img: "MK1.jpg", alt: "Mortal Kombat 1" },
  { img: "overwatch.jpg", alt: "Overwatch 2" },
  { img: "skullgirls.png", alt: "Skull Girls" },
  { img: "sparking zero.jpg", alt: "Sparking Zero" },
  { img: "tekken8.jpg", alt: "Tekken 8" },
  { img: "tetrisEffect.jpeg", alt: "Tetris Effect" },
  { img: "underKnight.jpg", alt: "Under Knight in Birth" },
];

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('index', { games });
});

// Game-specific route
app.get('/game/:game', (req, res) => {
  const gameName = req.params.game;
  const game = games.find(g => g.alt.toLowerCase().replace(/\s+/g, '') === gameName);
  if (!game) {
    return res.status(404).send("Game not found");
  }

  const playersLookingToWager = [ //Hard values unless we use a database
    { username: 'Player 1', wager: 10, icon: 'profileIcon1.jpg' },
    { username: 'Player 2', wager: 20, icon: 'profileIcon2.jpg' },
    { username: 'Player 3', wager: 15, icon: 'profileIcon3.jpg' },
    { username: 'Player 4', wager: 5, icon: 'profileIcon4.jpg' },
    { username: 'Player 5', wager: 25, icon: 'profileIcon5.jpg' },
    { username: 'Player 6', wager: 50, icon: 'profileIcon6.jpg' },
  ];

  res.render('game', { game, players: playersLookingToWager });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
