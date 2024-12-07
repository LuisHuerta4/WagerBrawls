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
];

const tournamentGames = [
  { img: "fortnite.jpg", alt: "Fortnite" },
  { img: "streetfighter.png", alt: "Street Fighter 6" },
  { img: "rocketLeague.jpg", alt: "Rocket League" },
  { img: "2XKO.png", alt: "2XKO" },
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

const username = "xXBrawlerXx"; // Replace with actual user data

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('home', { games, username });
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
  res.render('tournament', { games: tournamentGames });
});

app.get('/tournament/:game', (req, res) => {
  const gameName = req.params.game;
  const game = tournamentGames.find(g => g.alt.toLowerCase().replace(/\s+/g, '') === gameName);
  if (!game) {
    return res.status(404).send("Game not found");
  }
  res.render('tournament-game', { game, bracket });
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
  
  if (!recipient) {
    return res.status(400).send('Recipient is required');
  }

  res.render('chat', { username: currentUser, recipient: recipient, gameName });
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