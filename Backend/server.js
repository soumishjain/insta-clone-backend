const app = require('./src/app.js')
const connectToDb = require('./src/config/database.js')

app.listen(3000, () => {
    console.log("server is running at port 3000")
})

connectToDb()


