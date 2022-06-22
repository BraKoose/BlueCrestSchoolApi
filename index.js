require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const expressjwt = require("express-jwt");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 9090

const users = [{
    id: 1,
    username: "admin",
    password: "bluecrest"
},
{
    id: 2,
    username: "student",
    password: "openlabs"
}]

app.use(bodyParser.json());
app.use(cors());

const jwtCheck = expressjwt({
    secret: "MySuperDuperSecret"
})

app.post("/login", (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400)
            .send("You need a username and Password");
        return;
    }

    const user = users.find((u) => {
        return u.username === req.body.username && u.password === req.body.password;
    });
    if (!user) {
        res.status(401)
            .send("User not found");
        return;
    }

    const token = jwt.sign({
        sub: user.id,
        username: user.username
    }, "mysuperdupersecret", { expiresIn: "3 hours" });
    res.status(200)
        .send({ access_token: token })
});

app.get("/resource", (req, res) => {
    res.status(200)
        .send("Public resource, everyone in bluecrest see this");
})

app.get("/resource/feature1", jwtCheck, (req, res) => {
    res.status(200)
        .send("You Should login to see this man ");
})


app.get("/status", (req, res) => {
    const localTime = (new Date()).toLocaleTimeString();
    res.status(200)
        .send(`Server time is ${localTime}.`);
})

app.get("*", (req, res) => {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})