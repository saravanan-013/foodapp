import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg';
import cors from 'cors';

const { Pool } = pkg;
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: "postgresql://employees_owner:8VxDRPKa3MSf@ep-holy-sun-a5jzlc5s.us-east-2.aws.neon.tech/Food?sslmode=require"
});

// Endpoint to add a new dish
app.post('/api/dishes', async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    const newDish = await pool.query(
      'INSERT INTO dishes (name, price) VALUES ($1, $2) RETURNING *',
      [name, price]
    );
    res.status(201).json(newDish.rows[0]);
  } catch (error) {
    console.error('Error adding dish:', error); // Log the complete error object
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get all dishes
app.get('/api/dishes', async (req, res) => {
  try {
    const allDishes = await pool.query('SELECT * FROM dishes');
    res.status(200).json(allDishes.rows);
  } catch (error) {
    console.error('Error getting dishes:', error); // Log the complete error object
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to delete a dish
app.delete('/api/dishes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM dishes WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Dish not found' });
    }
    res.status(200).json({ message: 'Dish deleted successfully' });
  } catch (error) {
    console.error('Error deleting dish:', error); // Log the complete error object
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to place an order (store cart details in the database)
app.post('/api/placeOrder', async (req, res) => {
  try {
    const { cartItems } = req.body;
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart items are required' });
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      for (const item of cartItems) {
        if (!item.name || !item.price) {
          throw new Error('Invalid cart item');
        }
        await client.query(
          'INSERT INTO orders (name, price) VALUES ($1, $2)',
          [item.name, item.price]
        );
      }

      await client.query('COMMIT');
      res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error placing order:', error); // Log the complete error object
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
