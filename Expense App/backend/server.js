require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Serve static files from frontend (for images)
app.use('/images', express.static(path.join(__dirname, '../frontend/public/images')));

// Serve static files from backend (for new images)
app.use('/backend-images', express.static(path.join(__dirname, './')));

// Serve static files from admin build
app.use('/admin', express.static(path.join(__dirname, '../admin/build')));

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Twilio configuration
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const ownerPhoneNumber = process.env.OWNER_PHONE_NUMBER;

// Sample data
const restaurants = [
  { id: 1, name: 'Pizzas', rating: 4.2, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop' },
  { id: 2, name: 'Burger', rating: 4.0, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop' },
  { id: 3, name: 'Cheeseburger', rating: 4.1, image: '/images/cheeseburger.jpg' },
  { id: 4, name: 'Veg Burger', rating: 4.3, image: '/images/vegburger.jpg' },
  { id: 5, name: 'French Fries', cuisine: 'American', rating: 4.1, image: '/images/frienchfries.jpg' },
  { id: 6, name: 'Grilled Sandwich', cuisine: 'American', rating: 4.0, image: '/images/grilledsandwich.jpg' },
  { id: 7, name: 'Club Sandwich', cuisine: 'American', rating: 4.0, image: '/images/clubsandwich.jpg' },
  { id: 8, name: 'Hot Dog', cuisine: 'American', rating: 4.2, image: '/images/hotdog.jpg' },
  { id: 9, name: 'Fried Chicken', cuisine: 'American', rating: 4.5, image: '/images/friedchicken.jpg' },
  { id: 10, name: 'Chicken Nuggets', cuisine: 'American', rating: 4.1, image: '/images/chickennuggets.jpg' },
  { id: 11, name: 'Popcorn Chicken', cuisine: 'American', rating: 3.9, image: '/images/popcornchicken.jpg' },
  { id: 12, name: 'Chicken Wings', cuisine: 'American', rating: 4.3, image: '/images/chickenwings.jpg' },
  { id: 13, name: 'Chicken Strips', cuisine: 'American', rating: 4.0, image: '/images/chickenstrips.jpg' },
  { id: 14, name: 'Shawarma', cuisine: 'Middle Eastern', rating: 4.2, image: '/images/shawarma.jpg' },
  { id: 15, name: 'Burrito', cuisine: 'Mexican', rating: 4.4, image: '/images/burrito.jpg' },
  { id: 16, name: 'Taco', cuisine: 'Mexican', rating: 4.0, image: '/backend-images/taco.jpg' },
  { id: 17, name: 'Quesadilla', cuisine: 'Mexican', rating: 4.0, image: '/backend-images/Quesadilla.jpg' },
  { id: 18, name: 'Nachos', cuisine: 'Mexican', rating: 4.0, image: '/backend-images/Nachos.jpg' },
  { id: 19, name: 'Submarine (Sub)', cuisine: 'American', rating: 4.0, image: '/backend-images/submarine.jpg' },
  { id: 20, name: 'Wrap', cuisine: 'American', rating: 4.0, image: '/backend-images/Wrap.jpg' },
  { id: 21, name: 'Veg Roll', cuisine: 'Indian', rating: 4.0, image: '/backend-images/Veg Roll.jpg' },
  { id: 22, name: 'Chicken Roll', cuisine: 'Indian', rating: 4.0, image: '/backend-images/Chicken Roll.jpg' },
  { id: 23, name: 'Samosa', cuisine: 'Indian', rating: 4.0, image: '/backend-images/Samosa.jpg' },
  { id: 24, name: 'Spring Roll', cuisine: 'Chinese', rating: 4.0, image: '/backend-images/Spring Roll.jpg' },
  { id: 25, name: 'Momos', cuisine: 'Chinese', rating: 4.0, image: '/backend-images/Momos.jpg' },
  { id: 26, name: 'Pasta', cuisine: 'Italian', rating: 4.0, image: '/backend-images/Pasta.jpg' },
  { id: 27, name: 'Noodles', cuisine: 'Chinese', rating: 4.0, image: '/backend-images/Noodles.jpg' },
  { id: 28, name: 'Fried Rice', cuisine: 'Chinese', rating: 4.0, image: '/backend-images/Fried Rice.jpg' },
  { id: 29, name: 'Manchurian', cuisine: 'Chinese', rating: 4.0, image: '/backend-images/Manchurian.jpg' },
  { id: 30, name: 'Maggi', cuisine: 'Asian', rating: 4.0, image: '/backend-images/Maggi.jpg' },
  { id: 31, name: 'Donut', cuisine: 'Dessert', rating: 4.0, image: '/backend-images/Donut.jpg' },
  { id: 32, name: 'Muffin', cuisine: 'Dessert', rating: 4.0, image: '/backend-images/Muffin.jpg' },
  { id: 33, name: 'Cupcake', cuisine: 'Dessert', rating: 4.0, image: '/backend-images/Cupcake.jpg' },
  { id: 34, name: 'Croissant', cuisine: 'French', rating: 4.0, image: '/backend-images/Croissant.jpg' },
  { id: 35, name: 'Pancake', cuisine: 'American', rating: 4.0, image: '/backend-images/Pancake.jpg' },
  { id: 36, name: 'Waffle', cuisine: 'American', rating: 4.0, image: '/backend-images/Waffle.jpg' },
  { id: 37, name: 'Ice Cream', cuisine: 'Dessert', rating: 4.0, image: '/backend-images/Ice Cream.jpg' },
  { id: 38, name: 'Milkshake', cuisine: 'Dessert', rating: 4.0, image: '/backend-images/Milkshake.jpg' },
  { id: 39, name: 'Smoothie', cuisine: 'American', rating: 4.0, image: '/backend-images/Smoothie.jpg' },
  { id: 40, name: 'Popcorn', cuisine: 'Snack', rating: 4.0, image: '/backend-images/Popcorn.jpg' },
  { id: 41, name: 'Garlic Bread', cuisine: 'Italian', rating: 4.0, image: '/backend-images/Garlic Bread.jpg' },
  { id: 42, name: 'Onion Rings', cuisine: 'American', rating: 4.0, image: '/backend-images/Onion Rings.jpg' },
  { id: 43, name: 'Cheese Balls', cuisine: 'Snack', rating: 4.0, image: '/backend-images/Cheese Balls.jpg' },
  { id: 44, name: 'Pizza Pockets', cuisine: 'Italian', rating: 4.0, image: '/backend-images/Pizza Pockets.jpg' },
  { id: 45, name: 'Corn Dog', cuisine: 'American', rating: 4.0, image: '/backend-images/Corn Dog.jpg' },
  { id: 46, name: 'Potato Wedges', cuisine: 'American', rating: 4.0, image: '/backend-images/potato widgets.jpg' },
  { id: 47, name: 'Chicken Puff', cuisine: 'Indian', rating: 4.0, image: '/backend-images/Chicken Puff.jpg' },
  { id: 48, name: 'Veg Puff', cuisine: 'Indian', rating: 4.0, image: '/backend-images/Veg Puff.jpg' },
  { id: 49, name: 'Vada Pav', cuisine: 'Indian', rating: 4.0, image: '/backend-images/Vada Pav.jpg' },
  { id: 50, name: 'Pav Bhaji', cuisine: 'Indian', rating: 4.0, image: '/backend-images/Pav Bhaji.jpg' },
];

const orders = [];

// Routes
app.get('/api/restaurants', (req, res) => {
  res.json(restaurants);
});

app.get('/api/restaurants/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const restaurant = restaurants.find(r => r.id === id);
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).json({ message: 'Restaurant not found' });
  }
});

app.post('/api/orders', (req, res) => {
  const order = { id: orders.length + 1, ...req.body };
  orders.push(order);

  // Send email notification
  const mailOptions = {
    from: 'mohamedsafeen590@gmail.com',
    to: 'mohamedsafeen590@gmail.com',
    subject: 'New Order Placed',
    text: `New order received:\n\nItems: ${order.items}\nAddress: ${order.address}\nPhone: ${order.phone}\nRestaurant ID: ${order.restaurantId}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  // Send SMS notification
  const smsMessage = `New order received:\nItems: ${order.items}\nAddress: ${order.address}\nPhone: ${order.phone}\nRestaurant ID: ${order.restaurantId}`;

  twilioClient.messages
    .create({
      body: smsMessage,
      from: twilioPhoneNumber,
      to: ownerPhoneNumber
    })
    .then(message => console.log('SMS sent: ' + message.sid))
    .catch(error => console.log('SMS error: ' + error.message));

  res.json(order);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
