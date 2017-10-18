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
//索引文章
router.get('/api/getList', function (req, res) {
    let year = parseInt(req.query.year)
    let month = parseInt(req.query.month)
    let tag = req.query.tag
    let list
    console.log(tag)
    if(tag!==""){
        list = db.posts.find({tag:tag},{brief:0,content:0}).sort({year:-1,month:-1,day:-1})
    }else if(month){
        list = db.posts.find({year:year,month:month},{brief:0,content:0}).sort({day:-1})
    }else{
        list = db.posts.find({year:year},{brief:0,content:0}).sort({month:-1,day:-1})
    }
    list.exec(function(err,docs){
        if (err) {
            console.error(err)
            return
        }
        res.json(docs)
    })
})
//查询时间索引
router.get('/api/getDates', function (req, res){
    db.date.find({}).sort({month:1}).exec(function(err,docs){
        let datas = docs
        db.date.find({}).distinct("year").exec(function(err,docs){
            function sortyear(a,b){return a - b}
            let years = docs.sort(sortyear)
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
            i1 = i1.reverse()
            res.json(i1)
        })
    })  
})
//查询标签索引
router.get('/api/getDates', function (req, res){
    db.tags.find({}).sort({article:1}).exec(function(err,docs){
        if(err){}
        res.json(docs)
    })
})
//获取文章
router.get('/api/getPosts', function (req, res) {
    let page = parseInt(req.query.page)
    let pieces = parseInt(req.query.pieces)
    let id = parseInt(req.query.postId)
    let skips = (page-1)*pieces
    let posts
    if(id!=="" && !isNaN(id)){
        posts = db.posts.find({postid:id})
    }else{
        posts = db.posts.find({}).sort({year:-1,month:-1,day:-1}).skip(skips).limit(pieces)
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
    //啊    回调地狱
    //获取文章的ID
    db.ids.findOneAndUpdate({"post":"ids"},{$inc:{'id':1}},{new:true},function(err,docs){
        if(err){
            console.log(err)
            return
        }
        let post = req.body
        post.year = parseInt(post.year)
        post.month = parseInt(post.month)
        post.day = parseInt(post.day)
        post.postid = docs.id
        if(post.tag==""){post.tag="未分类"}
        //对分类进行操作
        db.tags.find({tag:post.tag},function(err,docs){
            if(docs.length==0){
                db.tags({tag:post.tag,article:1}).save()
            }else{
                docs[0].article=docs[0].article+1
                db.tags(docs[0]).save()
            }
            //对日期索引进行操作
            db.date.find({year:post.year,month:post.month},function(err,docs){
                if(docs.length==0){
                    db.date({year:post.year,month:post.month,article:1}).save()
                }else{
                    docs[0].article=docs[0].article+1
                    db.date(docs[0]).save()
                }
                //保存文章
                new db.posts(post).save(function(err){
                    if(err){
                        console.log(err)
                        res.status(500).send()
                        return
                    }
                    res.send()
                }) 
            })
        }) 
    })
})

module.exports = router