import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { UserModel } from './db.js';
import bcrypt from 'bcrypt'

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async(req, res) =>{

    const username = z.string().toLowerCase().min(3).max(50).email().parse( req.body.username);
    const password = z.string().min(3).max(50).toLowerCase().toUpperCase().parse(req.body.password);

    let hashPassword = await bcrypt.hash(password, 10)

    await UserModel.create({
        username: username,
        password: hashPassword
    })

})


app.post("/api/v1/signin", (req, res) =>{

})


app.post("/api/v1/content", (req, res) =>{

})


app.get("/api/v1/content" , (req, res) =>{

})

app.delete("/api/v1/content", (req, res)=>{

})


app.post("/api/v1/brain/share", (req, res) =>{

})

app.get("/api/v1/brain/:shareLink", (req, res)=>{
    
})

