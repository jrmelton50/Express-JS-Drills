const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

let app = express();

// // Middleware
// app.use( (req, res, next) => {
//     console.log(req.url);
//     next(); // pass on to the next middleware
// });

app.use(bodyParser.urlencoded({ extended: false }));

// app.get("/", (req, res) => {
//     res.send("Hello from the web server side...");
// });

app.get("/formsubmissions", (req, res) => {
    fs.readFile("output.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
        }
        let parsedData = JSON.parse(data);
        res.send(parsedData);
    });
});

app.post("/form", (req, res) => {
    fs.readFile("output.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
        }
        let parsedData = JSON.parse(data);
        // console.log("data = ", parsedData);
        // console.log("data.formSubmissions = ", parsedData.formSubmissions);
        let array = parsedData.formSubmissions;
        let obj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }
        array.push(obj);
        fs.writeFileSync("output.json", JSON.stringify(parsedData));
        // fs.appendFile("../output.json", JSON.stringify(array));
        res.send("Form submitted!");
    });
});

app.use(express.static(path.join(__dirname, "../public")));
app.listen(3000);