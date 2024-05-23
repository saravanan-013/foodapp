import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg';
import cors from 'cors';

const { Pool } = pkg;
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// const pool = new Pool({
//   port: 5432,
//   host: 'localhost',
//   database: 'Food',
//   password: '1234',
//   user: 'postgres',
// });
const pool =new Pool({
  connectionString:"postgresql://employees_owner:8VxDRPKa3MSf@ep-holy-sun-a5jzlc5s.us-east-2.aws.neon.tech/Food?sslmode=require"
})

// Endpoint to add a new dish
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

// Endpoint to get all dishes
app.get('/api/dishes', async (req, res) => {
  try {
    const allDishes = await pool.query('SELECT * FROM dishes');
    res.status(200).json(allDishes.rows);
  } catch (error) {
    console.error('Error getting dishes:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to delete a dish
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

// Endpoint to place an order (store cart details in the database)
app.post('/api/placeOrder', async (req, res) => {
  try {
    const { cartItems } = req.body;
    // Iterate through cartItems and insert each item into the database
    for (const item of cartItems) {
      await pool.query(
        'INSERT INTO orders (name, price) VALUES ($1, $2)',
        [item.name, item.price]
      );
    }
    res.status(20).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
