const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const URI = process.env.URI;

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect(URI)
var db = mongoose.connection
db.on('error', () => console.log("Error in connecting to database"))
db.once('open', () => console.log("Database Connected"))


app.post("/add", async (req, res) => {
    var category_select = await req.body.category_select;
    var amount_input = await req.body.amount_input;
    var info = await req.body.info;
    var date_input = await req.body.date_input;

    var data = {
        "Category": category_select,
        "Amount": amount_input,
        "Info": info,
        "Date": date_input
    }

    await db.collection("users").insertOne(data, (err, collection) => {
        if (err) {
            throw new Error("Error in Database: ", err.message)
        }
        console.log("Record Inserted Successfully")
    })
})

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html')
})

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})