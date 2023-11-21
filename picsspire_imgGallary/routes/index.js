const express = require('express');
const router = express.Router();
const userModel = require("./users")
const postModel = require("./posts")


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/createUser",async (req,res)=>{
  const createdUser = await userModel.create({
    username : "vishu123",
    password : "Vishu@45",
    email : "Vishwajeetspatil143@gmail.com",
    fullName : "Vishwajeet Subhash Patil",
  })
  res.send(createdUser);
})

router.get("/createPost",async(req,res)=>{
  const createdPost = await postModel.create({
    postText : "This Is My First Post",
    user : "655c94b7bb3298f4915527da",
  })
  const user = await userModel.findOne({_id:"655c94b7bb3298f4915527da"}).populate("posts");
  user.posts.push(createdPost._id);
  await user.save();
  res.send(user);
})


module.exports = router;
