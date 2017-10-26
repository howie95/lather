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
//获取文章列表
router.get('/api/getPostslist', function (req, res) {
    let page = parseInt(req.query.page)
    let pieces = parseInt(req.query.pieces)
    let skips = (page-1)*pieces
    postslist = db.posts.find({},{brief:0,content:0}).sort({year:-1,month:-1,day:-1}).skip(skips).limit(pieces)
    postslist.exec(function (err, docs) {
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
//编辑文章
router.post('/api/editPost', function (req, res){
    let obj = req.body
    obj.year = parseInt(obj.year)
    obj.month = parseInt(obj.month)
    obj.day = parseInt(obj.day)
    db.posts.find({_id:obj._id},function(err,docs){
        if(err){
          res.status(500).send()
          return
        }
        if(obj.year!==docs[0].year||obj.month!==docs[0].month){
            obj.oldyear = docs[0].year
            obj.oldmonth = docs[0].month
        }
        if(obj.tag!==docs[0].tag){
            obj.oldtag = docs[0].tag
        }
        dateChange(obj,res)
    })
})
    //时间改变处理
    function dateChange(obj,res){
        if(obj.oldyear){
            db.date.find({year:obj.oldyear,month:obj.oldmonth},function(err,docs){
                docs[0].article=docs[0].article-1
                db.date(docs[0]).save()
                db.date.find({year:obj.year,month:obj.month},function(err,docs){
                    if(docs.length==0){
                        db.date({year:obj.year,month:obj.month,article:1}).save()
                    }else{
                        docs[0].article=docs[0].article+1
                        db.date(docs[0]).save()
                    }
                    delete obj.oldyear
                    delete obj.oldmonth
                    tagChange(obj,res)
                })
            })
        }else{tagChange(obj,res)}
    }
    //分类改变处理
    function tagChange(obj,res){
        if(obj.oldtag){
            db.tags.find({tag:obj.oldtag},function(err,docs){
                docs[0].article=docs[0].article-1
                db.tags(docs[0]).save()
                db.tags.find({tag:obj.tag},function(err,docs){
                    if(docs.length==0){
                        db.tags({tag:obj.tag,article:1}).save()
                    }else{
                        docs[0].article=docs[0].article+1
                        db.tags(docs[0]).save()
                    }
                    delete obj.oldtag
                    saveEdit(obj,res)
                })
            })
        }else{saveEdit(obj,res)}
    }
    //保存编辑后的文章
    function saveEdit(obj,res){
        db.posts.findOneAndUpdate({_id:obj._id},obj,function(err){
            if(err){
                console.log(err)
                res.status(500).send()
                return
            }
            res.send()
        })
    }
//删除文章
router.post('/api/delPost', function (req, res) {
    db.posts.find({postid:req.body.id}).exec(function(err,docs){
        db.tags.find({tag:docs[0].tag},function(err,docs){
            docs[0].article=docs[0].article-1
            db.tags(docs[0]).save()
        })
        db.date.find({year:docs[0].year,month:docs[0].month},function(err,docs){
            docs[0].article=docs[0].article-1
            db.date(docs[0]).save()
        })
        db.posts.remove({postid:req.body.id},function(err){
            if (err) {
                res.status(500).send()
                return
            }
            res.send()
        })
    })
})

//保存单页
router.post('/api/savePage', function (req, res){
    //编辑单页
    if(req.body._id){
        let page = req.body
        db.sps.findOneAndUpdate({_id:page._id},page,function(err){
            if(err){
                console.log(err)
                res.status(500).send()
                return
            }
            res.send()
        })
    }else{
        //获取单页的ID
        db.ids.findOneAndUpdate({"singlepage":"ids"},{$inc:{'id':1}},{new:true},function(err,docs){
            if(err){
                console.log(err)
                return
            }
            let page = req.body
            page.spageid = docs.id
            new db.sps(page).save(function(err){
                if(err){
                    console.log(err)
                    res.status(500).send()
                    return
                }
                res.send()
            }) 
        })
    }
})
//获取单页
router.get('/api/getPages', function (req, res) {
    let link = req.query.link
    let pageid = parseInt(req.query.pageid)
    let pages
    if(link!=="" && link){
        pages = db.sps.find({link:link})
    }else if(pageid!=="" && !isNaN(pageid)){
        pages = db.sps.find({spageid:pageid})
    }else{
        pages = db.sps.find({})
    }
    pages.exec(function (err, docs) {
        if (err) {
          console.error(err)
          return
        }
        res.json(docs)
    })
})
//获取单页列表
router.get('/api/getPageslist', function (req, res) {
    pageslist = db.sps.find({},{content:0})
    pageslist.exec(function (err, docs) {
        if (err) {
          console.error(err)
          return
        }
        res.json(docs)
    })
})
//删除单页
router.post('/api/delPage', function (req, res) {
    db.sps.remove({spageid:req.body.id},function(err){
        if (err) {
            res.status(500).send()
            return
        }
        res.send()
    })
})

//管理员检测
router.post('/api/checkLog',function (req, res) {
    if(req.session.user){
        res.json({
            status:"0",
        })
    }else{
        res.json({
            status:"2",
        })
    }
})
//管理员登陆
router.post('/api/logIn',function (req, res) {
    db.admins.findOne(req.body,function(err,doc){
        if(err){
            res.json({
            status:"1",
            })
        }else{
            if(doc){
            res.cookie("admin",doc.name,{
                path:'/',
                maxAge:1000*60*60*24
            })
            req.session.user = doc.name
            res.json({
                status:"0",
                result:{
                name:doc.name,
                }
            })
            }else{
            res.json({
                status:"2",
            })
            }
        }
    })
})
//管理员登出
router.post('/api/logout',function (req, res) {
    res.cookie("admin","",{
      path:'/',
      maxAge:-1
    })
    req.session.user = null
    res.json({
      status:"0"
    })
  })

module.exports = router