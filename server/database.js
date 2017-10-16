const mongoose = require('mongoose')
mongoose.Promise = global.Promise 
mongoose.connect('mongodb://localhost:27017/lather')

const postSchem = new mongoose.Schema({
    title: String,
    year: String,
    month: String,
    day: String,
    time: String,
    tag: String,
    brief: String,
    content: String,
    postid: Number,
})
const idsSchem = new mongoose.Schema({
    post: String,
    id: Number,
})
const dateSchem = new mongoose.Schema({
    year: String,
    month: String,
    article: Number,
})

const tagSchem = new mongoose.Schema({
    tag: String,
})

const adminUser = new mongoose.Schema({
    name: String,
    password: String,
})

const Models = {
    posts: mongoose.model('post',postSchem),
    ids: mongoose.model('id',idsSchem,'postids'),
    date: mongoose.model('date',dateSchem,'stat'),
    admins: mongoose.model('admin',adminUser),
    tags:mongoose.model('tag',tagSchem),
}

module.exports = Models