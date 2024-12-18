// Install node and run npm i in terminal to isntall all dependancies 
// Run program in dev mode with nodemon: [nodemon server.js]
// Run program for production: [node server.js]
const express = require('express');
const http = require('http'); // Required for Socket.IO
const { Server } = require('socket.io'); // Importing Socket.IO
const path = require('path')

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server); // Attach Socket.IO to the server
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
  { img: "CODAdvancedWarfare.png", alt: "COD: Advanced Warfare" },
  { img: "CODBlackOps.jpg", alt: "COD: Black Ops" },
  { img: "CODBlackOps2.jpg", alt: "COD: Black Ops 2" },
  { img: "CODBlackOps3.jpg", alt: "COD: Black Ops 3" },
  { img: "CODBlackOps4.jpg", alt: "COD: Black Ops 4" },
  { img: "CODBOcOLDwARZomb.jpeg", alt: "COD: Black Ops Cold War Zombies" },
  { img: "CODColdWar.jpg", alt: "COD: Cold War" },
  { img: "CODGhost.jpg", alt: "COD: Ghosts" },
  { img: "CODInfiniteWarfare.jpg", alt: "COD: Infinite Warfare" },
  { img: "CODModernWarfare.jpg", alt: "COD: Modern Warfare" },
  { img: "CODMW2.jpg", alt: "COD: Modern Warfare 2" },
  { img: "CODModernWarfare2.jpg", alt: "COD: Modern Warfare(2009)" },
  { img: "CODMW3.png", alt: "COD: Modern Wardare 3" },
  { img: "CODMW3.jpg", alt: "COD: Modern Warfare(2011)" },
  { img: "CODMWRemastered.jpg", alt: "COD: Modern Warfare Remastered" },
  { img: "CODvanguard.jpeg", alt: "COD: Vanguard" },
  { img: "Warzone.jpg", alt: "COD: Warzone" },
  { img: "CODWW2.jpg", alt: "COD: World War 2" },
  { img: "CollegeFootball25.jpg", alt: "College Football 25" },
  { img: "FC24.jpg", alt: "FC24" },
  { img: "FC25.jpg", alt: "FC25" },
  { img: "Madden25.jpg", alt: "Madden 25" },
  { img: "mlbTheShow24.jpeg", alt: "MLB The Show 24" },
  { img: "2K25.jpg", alt: "NBA 2K25" },
  { img: "robloxArsenal.jpeg", alt: "Roblox: Arsenal" },
  { img: "robloxMichaelzombies.jpeg", alt: "Roblox: Michael Zombies" },
  { img: "RobloxRivals.png", alt: "Roblox: Rivals" },
  { img: "RogueCompany.jpg", alt: "Rogue Company" },
];

const tournamentGames = [
  { img: "fortnite.jpg", alt: "Fortnite", entryFee: 10 },
  { img: "streetfighter.png", alt: "Street Fighter 6", entryFee: 10 },
  { img: "rocketLeague.jpg", alt: "Rocket League", entryFee: 10 },
  { img: "2XKO.png", alt: "2XKO", entryFee: 10 },
];

const playersLookingToWager = [ //Hard values unless we use a database
  { username: 'Player 1', wager: 10, icon: 'profileIcon1.jpg' },
  { username: 'Player 2', wager: 20, icon: 'profileIcon2.jpg' },
  { username: 'Player 3', wager: 15, icon: 'profileIcon3.jpg' },
  { username: 'Player 4', wager: 5, icon: 'profileIcon4.jpg' },
  { username: 'Player 5', wager: 25, icon: 'profileIcon5.jpg' },
  { username: 'Player 6', wager: 50, icon: 'profileIcon6.jpg' },
];

const bracket = [
  { player1: 'Player 1', player2: 'Player 2' },
  { player1: 'Player 3', player2: 'Player 4' },
  { player1: 'Player 5', player2: 'Player 6' },
  { player1: 'Player 7', player2: 'Player 8' },
  { player1: 'Player 9', player2: 'Player 10' },
  { player1: 'Player 11', player2: 'Player 12' },
  // ...more matches...
];

const username = "xXBrawlerXx"; // Username of the current user

const profiles = {
  'xXBrawlerXx': {
    profilePicture: 'mainProfileIcon.jpg',
    topGames: ['Fortnite', 'Valorant', 'Clash Royale'],
    ranks: ['unreal.png', 'valDiamond.png', 'clashGold.png'],
    cardBackground: 'mainProfileCard.jpg' 
  },
  'Player 1': {
    profilePicture: 'profileIcon1.jpg',
    topGames: ['Rocket League', 'Overwatch 2', 'Halo Infinite'],
    ranks: ['RLGold.png', 'overwatchMaster.png', 'halo.png'],
    cardBackground: 'profileCard1.jpg' 
  },
  'Player 2': {
    profilePicture: 'profileIcon2.jpg',
    topGames: ['Street Fighter 6', 'Tekken 8', 'Mortal Kombat 1'],
    ranks: ['SF6Master.png', 'TekkenBattleRuler.png', 'defaultRank.png'],
    cardBackground: 'profileCard2.jpg' 
  },
  'Player 3': {
    profilePicture: 'profileIcon3.jpg',
    topGames: ['Brawlhalla', 'Guilty Gear Strive', 'Dragon Ball Fighterz'],
    ranks: ['BrawlhallaDiamond.png', 'defaultRank.png', 'defaultRank.png'],
    cardBackground: 'profileCard3.jpg' 
  },
  'Player 4': {
    profilePicture: 'profileIcon4.jpg',
    topGames: ['Counter Strike', 'Rainbow Six Siege', 'Valorant'],
    ranks: ['CSGO.png', 'R6Champion.png', 'ValorantEmerald.png'],
    cardBackground: 'profileCard4.jpg'
  },
  'Player 5': {
    profilePicture: 'profileIcon5.jpg',
    topGames: ['Master Duel', 'Granblue', 'Skull Girls'],
    ranks: ['MDDIamond.png', 'defaultRank.png', 'defaultRank.png'],
    cardBackground: 'profileCard5.jpg' 
  },
  'Player 6': {
    profilePicture: 'profileIcon6.jpg',
    topGames: ['Tetris Effect', 'Under Knight in Birth', 'Aether'],
    ranks: ['defaultRank.png', 'defaultRank.png', 'defaultRank.png'],
    cardBackground: 'profileCard6.jpg' 
  },
};

const shopItems = [
  { img: "shopCard1.jpg", name: "Dark Night", price: 10 },
  { img: "shopCard2.jpg", name: "Pink Horizon", price: 5 },
  { img: "shopCard3.jpg", name: "Blood Stars", price: 5 },
  { img: "shopCard4.jpg", name: "Est Japan", price: 20 },
  { img: "shopCard5.jpg", name: "Lazer Reflect", price: 10 },
  { img: "shopCard6.jpg", name: "Spray Paint", price: 5 },
  { img: "shopCard7.jpg", name: "Triangularity", price: 15 },
  { img: "shopCard8.jpg", name: "Cherry Blossom", price: 30 },
  { img: "shopCard9.jpg", name: "Wave", price: 10 },
  { img: "shopCard10.jpg", name: "Neon City", price: 15 },
  { img: "shopCard11.jpg", name: "Recycled Home", price: 5 },
  { img: "shopCard12.jpg", name: "Tokyo", price: 10 },
  { img: "shopCard13.jpg", name: "Pastel Kittens", price: 15 },
  // ...more items...
];

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  const walletAmount = 100; // Example wallet amount
  const brawlPoints = 50; // Example brawl points amount
  res.render('home', { games, username, walletAmount, brawlPoints });
});

// Game-specific route
app.get('/game/:game', (req, res) => {
  const currentUser = username;
  const gameName = req.params.game;
  const game = games.find(g => g.alt.toLowerCase().replace(/\s+/g, '') === gameName);
  if (!game) {
    return res.status(404).send("Game not found");
  }

  res.render('game', { game, players: playersLookingToWager, currentUser });
});

app.get('/tournament', (req, res) => {
  res.render('tournament', { games: tournamentGames, username });
});

app.get('/tournament/:game', (req, res) => {
  const gameName = req.params.game;
  const game = tournamentGames.find(g => g.alt.toLowerCase().replace(/\s+/g, '') === gameName);
  if (!game) {
    return res.status(404).send("Game not found");
  }
  res.render('tournament-game', { game, bracket, username });
});

app.post('/enter-tournament/:game', (req, res) => {
  const newPlayer = username; 
  bracket.push({ player1: newPlayer, player2: 'TBD' });
  const gameName = req.params.game;
  res.redirect(`/tournament/${gameName}`);
});

app.get('/chat', (req, res) => {
  const currentUser = req.query.username; 
  const recipient = req.query.recipient;  
  const gameName = req.query.gameName; // Get the game name from the query parameters
  
  if (!recipient || !gameName) {
    return res.status(400).send('Recipient and game name are required');
  }

  const currentUserProfilePicture = profiles[currentUser]?.profilePicture || 'defaultProfileIcon.jpg';
  const recipientProfilePicture = profiles[recipient]?.profilePicture || 'defaultProfileIcon.jpg';

  res.render('chat', { 
    username: currentUser, 
    recipient: recipient, 
    gameName, 
    currentUserProfilePicture, 
    recipientProfilePicture 
  });
});

app.get('/profile/:username', (req, res) => {
  const username = req.params.username;
  const profile = profiles[username];
  if (!profile) {
    return res.status(404).send("Profile not found");
  }
  const reputation = 75; 
  const totalEarnings = 1250; 
  const totalWins = 57; 
  const ranks = profile.ranks; 
  res.render('profile', { username, profilePicture: profile.profilePicture, topGames: profile.topGames, games, reputation, profileCard: profile.cardBackground, totalEarnings, totalWins, ranks });
});

app.get('/results', (req, res) => {
  const gameName = req.query.gameName;
  const game = games.find(g => g.alt.toLowerCase().replace(/\s+/g, '') === gameName);
  if (!game) {
    return res.status(404).send("Game not found");
  }
  const currentUserProfilePicture = profiles[username]?.profilePicture || 'defaultProfileIcon.jpg';
  const recipient = req.query.recipient;
  const recipientProfilePicture = profiles[recipient]?.profilePicture || 'defaultProfileIcon.jpg';
  res.render('results', { username, gameImg: game.img, gameName: game.alt, currentUserProfilePicture, recipientProfilePicture, recipient });
});

app.get('/shop', (req, res) => {
  const walletAmount = 100; // Example wallet amount
  const brawlPoints = 50; // Example brawl points amount
  res.render('shop', { username, walletAmount, brawlPoints, shopItems });
});

const activeUsers = {}; //stores the usernames and uses the socket ID as the key

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Triggered when you join a room
  socket.on('join room', ({ currentUser, recipient }) => {
    activeUsers[socket.id] = currentUser;
    socket.join(recipient);
    console.log(`${currentUser} joined ${recipient} room`);
  });

  // Handle user sending a message
  socket.on('chat message', ({ room, message }) => {
    const sender = activeUsers[socket.id]; // Get the username of the sender from activeUsers
    io.to(room).emit('chat message', { sender, message });
  });

  // Handle disconnection from room
  socket.on('disconnect', () => {
    console.log('A user disconnected. ID:', socket.id);
    delete activeUsers[socket.id];
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});