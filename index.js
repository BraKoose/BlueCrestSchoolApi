require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 9090

const app = express();

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