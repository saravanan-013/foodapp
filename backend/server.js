import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { Pool } = pkg;
const app = express();
const port = 3001;
const JWT_SECRET = 'your_jwt_secret'; // Replace with a strong secret

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  port: 5432,
  host: 'localhost',
  database: 'Food',
  password: '1234',
  user: 'postgres',
});

// Register Endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, collegeName, canteenName, mobileNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, password, college_name, canteen_name, mobile_number) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [username, hashedPassword, collegeName, canteenName, mobileNumber]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Signin Endpoint
app.post('/api/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error signing in:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};



// Endpoint to add a new dish without authentication
app.post('/api/dishes', async (req, res) => {
  try {
    const { name, price } = req.body;
    const newDish = await pool.query(
      'INSERT INTO dishes (name, price) VALUES ($1, $2) RETURNING *',
      [name, price]
    );
    res.status(201).json(newDish.rows[0]);
  } catch (error) {
    console.error('Error adding dish:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// Endpoint to get all dishes (no authentication required for user home page)
app.get('/api/dishes', async (req, res) => {
  try {
    const allDishes = await pool.query('SELECT * FROM dishes');
    res.status(200).json(allDishes.rows);
  } catch (error) {
    console.error('Error getting dishes:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Endpoint to delete a dish without authentication
app.delete('/api/dishes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM dishes WHERE id = $1', [id]);
    res.status(200).json({ message: 'Dish deleted successfully' });
  } catch (error) {
    console.error('Error deleting dish:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Endpoint to place an order without authentication
app.post('/api/placeOrder', async (req, res) => {
  try {
    const { cartItems, mobileNumber } = req.body;
    if (!mobileNumber) {
      return res.status(400).json({ error: 'Mobile number is required' });
    }

    // Insert the order details along with the mobile number
    const orderPromises = cartItems.map(item => 
      pool.query(
        'INSERT INTO orders (name, price, mobile_number) VALUES ($1, $2, $3)',
        [item.name, item.price, mobileNumber]
      )
    );

    await Promise.all(orderPromises);

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
