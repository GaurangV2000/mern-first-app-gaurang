const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

require("../DB/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Hello World From Router Database");
});

//using promises

// router.post("/register",  (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;
//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "Plz fill all the details" });
//   }

//   User.findOne({ email: email })
//     .then((userExists) => {
//       if (userExists) {
//         return res.status(422).json({ error: "EMAIL ALREADY EXISTS" });
//       }
//       const user = new User({ name, email, phone, work, password, cpassword });

//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "user registered successfully" });
//         })
//         .catch((err) => res.status(500).json({ error: "failed registration" }));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//using async await

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Plz fill all the details" });
  }

  try {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ error: "EMAIL ALREADY EXISTS" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password is not Matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      await user.save();

      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

// login route

router.post("/signIn", async (req, res) => {
  //   console.log(req.body);
  //   res.json({ message: "Awesome" });

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Plz Fill THe Data" });
    }

    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 259000000),
        httpOnly: true,
      });
      console.log(res.cookie);

      if (!isMatch) {
        res.status(400).json({ message: "invalid credentials" });
      } else {
        res.json({ message: "user sign in successfully" });
      }
    } else {
      res.status(400).json({ message: "invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

//about us page

router.get("/about", authenticate, (req, res) => {
  res.send(req.rootUser);
});

// get user data for contact and home data

router.get("/getData", authenticate, (req, res) => {
  res.send(req.rootUser);
});

//  contact us page

router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log("plz fill the contact form properly");
      return res.json({ error: "Plz Fill the contact form" });
    }

    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );

      await userContact.save();

      res.status(201).json({ message: "message sent successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", (req, res) => {
  console.log("jello my logout page");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logout");
});

module.exports = router;
