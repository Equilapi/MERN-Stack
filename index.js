const app = require('./src/app')

// Settings
const port = process.env.PORT || 56000

// Starting the server
app.listen(port, () => console.log(`🔥🔥🔥 Server on port ${port} 🔥🔥🔥`))