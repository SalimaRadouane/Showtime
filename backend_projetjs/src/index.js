// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./userSchema');
const mongoose = require('./mongo');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/check-connection', (req, res) => {
  res.send('Connection to backend is established!');
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log('Received data:', { name, email, password });

    const existingUserByName = await User.findOne({ name });
    const existingUserByEmail = await User.findOne({ email });

    console.log('Existing user by name:', existingUserByName);
    console.log('Existing user by email:', existingUserByEmail);

    if (existingUserByName || existingUserByEmail) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    console.log('New user:', newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ $or: [{ name }, { email }] });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
