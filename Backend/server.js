const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors");
const User = require("./models/user")
const {MONGO_URI,PORT} = require("./constants")

app.use(cors())

app.use(express.json())

app.post("/dob", async (req, res) => {
    try {
      const { dob, email } = req.body;
      let user = await User.findOne({ email });
  
      if (!user) {
        user = await User.create({ dob, email, isFirst: false });
      }
  
        user.dob = dob;
        user.isFirst = false;
        await user.save();
  
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  
app.get("/:email",async(req,res) => {
    try {
        const {email} = req.params
        let user = await User.findOne({email})
        if(!user){
            user = await User.create({email})
        }
        res.status(200).json(user)
    } catch(err) {
        res.status(500)
    }
})

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server Listening on PORT : ${PORT}`)
    })
})