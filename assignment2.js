const express = require("express")
const app = express ()
app.use(express.urlencoded({extended: false}))

app.get("/number", (req, res) => {
    res.send(`
        <h1>Enter a number</h1>
        <form action = "/number/:num" method="POST">
            <input type="number" name="num" placeholder="enter any number">
                <button>Check</button>
        </form>
        `)
})

app.post("/number/:num", (req, res) => {
    if (req.body.num % 2 === 0) {
        res.send("It is even.")
    } else {
        res.send("It is odd.")
    }
})

app.listen(3000)
