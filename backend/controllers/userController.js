import asynceHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js'
import e from 'express';

//@desc Auth user & get token
//@route   POST /api/users/login
//@access  Public 
const authUser = asynceHandler(async (req, res) => {
   const {email, password} = req.body;

   const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
   else {
        res.status(401);
        throw new Error('Invalid email or password');
   }
}) 

//@desc Register user
//@route   POST /api/users
//@access  Public 
const registerUser = asynceHandler(async (req, res) => {
    const {name, email, password} = req.body;
 
    const userExitst = await User.findOne({email});
 
    if (userExitst) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name, 
        email, 
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
 }) 

//@desc Get user profile
//@route   GET /api/users/profile
//@access  Private
const getUserProfile = asynceHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
 }) 

 //@desc Update user profile
//@route   GET /api/users/profile
//@access  Private
const updateUserProfile = asynceHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password 
        }

        const updateUser = await user.save()
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id)
        })
        
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
 }) 

const getUsers = asynceHandler(async (req, res) => {
const users = await User.find({})
res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asynceHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
      await user.remove()
      res.json({ message: 'User removed' })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })

  const getUserById = asynceHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
  
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })

  const updateUser = asynceHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
  
  

export {
    authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser
}

