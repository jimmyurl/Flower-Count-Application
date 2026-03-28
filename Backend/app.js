require('dotenv').config(); 
const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors'); // Since I run backend and frontend on different ports.

const app = express();

// Secret key for JWT from environment variable
const JWT_SECRET = process.env.JWT_SECRET;

// Mock user data (for demonstration purposes)
const users = [
    {
        username: 'user1',
        password: '$2a$10$KIXEixJ/a8mvg6RzXnqaQevs9EwIXeKDeaF2k2PtHAsRd/Twy7H8O' // 'password123'
    }
];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to enable CORS if frontend and backend are on different origins
app.use(cors());

// Middleware to check API key
const apiKeyAuth = (req, res, next) => {
    const apiKey = req.headers['api-key'];
    if (apiKey === process.env.API_KEY) {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden' });
    }
};

// Middleware to check JWT
const jwtAuth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'flower_test_images'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// Handle file upload and image processing
app.post('/process-images', upload.array('images'), async (req, res) => {
    try {
        // Simulate processing and return mock data
        const flowerCounts = req.files.reduce((acc, file) => {
            acc[file.filename] = Math.floor(Math.random() * 100); // Random count for demo
            return acc;
        }, {});

        res.json(flowerCounts);
    } catch (error) {
        console.error('Error processing images:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Serve static files from the 'flower_test_images' directory with API key check
app.use('/flower_test_images', apiKeyAuth, express.static(path.resolve(__dirname, 'flower_test_images')));

// Directory listing route with JWT check
app.get('/flower_test_images', jwtAuth, async (req, res) => {
    try {
        const files = await fs.readdir(path.resolve(__dirname, 'flower_test_images'));
        res.json(files);
    } catch (error) {
        console.error("Error listing files:", error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

// User login route to get JWT
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to the Flower Count API!');
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    
});
