const mongoose = require('mongoose')
mongoose.Promise = global.Promise 
mongoose.connect('mongodb://localhost:27017/lather',{useMongoClient: true},function(err){
    if(err){console.log("数据库连接失败！")}
    else{console.log("数据库连接成功！")}
})

const postSchem = new mongoose.Schema({
    title: String,
    year: Number,
    month: Number,
    day: Number,
    time: String,
    tag: String,
    brief: String,
    content: String,
    postid: Number,
})
const spSchem = new mongoose.Schema({
    title: String,
    content: String,
    link: String,
    spageid: Number,
})
const idsSchem = new mongoose.Schema({
    post: String,
    id: Number,
})
const dateSchem = new mongoose.Schema({
    year: Number,
    month: Number,
    article: Number,
})

const tagSchem = new mongoose.Schema({
    tag: String,
    article: Number,
})

const adminUser = new mongoose.Schema({
    name: String,
    password: String,
})

const Models = {
    posts: mongoose.model('post',postSchem,'posts'),
    sps: mongoose.model('sp',spSchem,'singlepages'),
    ids: mongoose.model('id',idsSchem,'postids'),
    date: mongoose.model('date',dateSchem,'stat'),
    admins: mongoose.model('admin',adminUser,'admins'),
    tags:mongoose.model('tag',tagSchem,'tags'),
}

module.exports = Models