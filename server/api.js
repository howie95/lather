const express = require('express')
const router = express.Router()
const db = require('./database')

//获取所有标签
router.get('/api/getTags', function (req, res) {
    db.tags.find({}, function (err, docs) {
      if (err) {
        console.error(err)
        return
      }
      res.json(docs)
    })
  })
//时间索引
router.get('/api/getDates', function (req, res){
    db.date.find({}).sort({year:1}).exec(function(err,docs){
        let datas = docs
        db.date.find({}).distinct("year").exec(function(err,docs){
            let years = docs
            let i1 = []
            for(year in years){
                let thisyear = years[year]
                let i2 = {year:thisyear}
                let i3 =[]
                for(item in datas){
                    if(datas[item].year == thisyear){i3.push(datas[item])}
                }
                i2.months = i3.reverse()
                i1.push(i2)
            }
            res.json(i1)
        })
    })  
})
//获取文章
router.get('/api/getPosts', function (req, res) {
    let page = parseInt(req.query.page)
    let pages = parseInt(req.query.pages)
    let id = parseInt(req.query.postId)
    let tag = req.query.tag
    let skips = (page-1)*pages
    let posts
    if(id!=="" && !isNaN(id)){
        posts = db.posts.find({postid:id})
    }else if(tag !==""&& tag){

    }else{
        posts = db.posts.find({})
    }
    posts.exec(function (err, docs) {
        if (err) {
          console.error(err)
          return
        }
        res.json(docs)
    })
})
//保存文章
router.post('/api/savePost', function (req, res){
    db.ids.findOneAndUpdate({"post":"ids"},{$inc:{'id':1}},{new:true},function(err,doc){
        if(err){
            console.log(err)
            return
        }
        let post = req.body
        post.postid = doc.id
        new db.posts(post).save(function(err){
            if(err){
                res.status(500).send()
                return
            }
            res.send()
        })    
    })
})

module.exports = router