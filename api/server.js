require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// let cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 9000;
var token;
const secret = require("crypto").randomBytes(64).toString("hex");
app.use(express.static("public"));
app.use(bodyParser.json());
// app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set("useFindAndModify", false);
mongoose.connect(
  "mongodb+srv://admin-jay:jay12345@cluster0.nhukd.mongodb.net/nemesisDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const nemesisSchema = new mongoose.Schema({
  username: "",
  mobileNum: "",
  address: "",
  email: "",
});

function generateAccessToken(email) {
  return jwt.sign(
    email,
    "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611",
    { expiresIn: "300s" }
  );
}

const User = mongoose.model("user", nemesisSchema);

app.post("/login", (req, res) => {
  if (
    process.env.email === req.body.email &&
    process.env.password === req.body.password
  ) {
    token = generateAccessToken({ email: req.body.email });
    console.log(secret);
    res.json(token);
  } else {
    res.send("Login failed");
  }
});

app.post("/", (req, res) => {
  if (token !== null) {
    console.log("START");
    jwt.verify(
      token,
      "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611",
      (err, verified) => {
        if (err) {
          res.send("REmoveCOkkie");
        } else {
          console.log(verified);
          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            address: req.body.address,
            mobileNum: req.body.mobileNum,
          });
          newUser.save((err) => {
            if (err) {
              res.status(300).send("Failed");
            } else {
              res.status(200).send("User added successfully");
            }
          });
        }
      }
    );
  }

  //   console.log(JSON.stringify(verify) + "  Verify  " + secret);

  //
  // });
  //   } else {
  //     console.log(token + "   TOKEN");
  //     console.log("NO TOKEN");
  //   }
});
app.get("/showDetails", (req, res) => {
  User.find({}, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      res.json(foundUser);
    }
  });
});

app.patch("/patch", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  console.log(name);

  if (token !== null) {
    console.log("START");
    jwt.verify(
      token,
      "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611",
      (err, verified) => {
        if (err) {
          res.send("REmoveCOkkie");
        } else {
          User.findOneAndUpdate(
            { _id: req.body.id },
            { $set: { [name]: "" } },
            (err, data) => {
              if (err) {
                console.log(err);
              } else {
                console.log(data);
                res.send("Success");
              }
            }
          );
        }
      }
    );
  }
});

app.listen(port, () => {
  console.log(`server listens at http://localhost:${port}`);
});
