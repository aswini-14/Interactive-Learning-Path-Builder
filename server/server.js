const express = require('express');
const pool = require('./config/database'); // PostgreSQL pool
const authRoutes = require('./routes/auth');
const pathRoutes = require('./routes/paths');
const progressRoutes = require('./routes/progress');
const resourceRoutes = require('./routes/resources'); 
const app = express();
const cors = require('cors');
app.use(cors());
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/paths', pathRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/resources', resourceRoutes); 
app.use('/api/certificates', require('./routes/certificates'));

io.on('connection', socket => {
  console.log('User connected');
  socket.on('resource-updated', data => {
    socket.broadcast.emit('resource-update', data);
  });
});

// Use raw SQL queries instead of Sequelize's sync
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  } else {
    console.log('Database connected:', res.rows[0]);
    server.listen(5000, () => console.log('Server started on port 5000'));
  }
});
