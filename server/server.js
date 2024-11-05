import express from 'express'  // Importing the Express framework
import cors from 'cors'  // Importing CORS to enable cross-origin requests
import tripRoutes from './routes/trips.js'  // Importing routes for trip-related endpoints

const app = express()  // Initializing the Express app

app.use(express.json())  // Middleware to parse JSON request bodies
app.use(cors())  // Middleware to enable CORS, allowing requests from other origins

// Root route, provides a welcome message for the API
app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ OnTheFly API</h1>')
})

// Route for handling trip-related requests, using the imported tripRoutes
app.use('/api/trips', tripRoutes)

// Setting the port for the server (defaults to 3001 if PORT is not set in environment variables)
const PORT = process.env.PORT || 3001

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})
