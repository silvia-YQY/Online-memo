var express = require('express');
var router = express.Router();
var Note = require('../model/note')

/* GET notes listing. */
/* 获取所有的 notes */
router.get('/notes', function(req, res, next) {
    console.log('notes................')
    var query = {raw:true}
    if(req.session.user){           //判断是否已经登录，若已登录，只显示自己的note
        query.where = {
            uid:req.session.user.id
        }
    }
    Note.findAll(query).then((notes) => {  //否则显示早已设置好的note
        console.log(notes)
        res.send({status:0,data:notes})
    }).catch(() => {
        res.send({status:1,errorMsg:"数据库出错啦！"})
    })


});

/*新增note*/
router.post('/notes/add', function(req, res, next) {
    if(!req.session.user){           //判断是否已经登录，否则弹出错误提示
        return res.send({status:1,errorMsg:'请先登录'})
    }

    var uid = req.session.user.id
    var note = req.body.note
    Note.create({text:note,uid:uid}).then(() => {
        res.send({status:0})
        console.log('uuuuuuuuuuuuid' ,uid)
    }).catch(() => {
        res.send({status:1,errorMsg:"数据库出错啦！"})
    })
    console.log('add note' ,note)
  });

/*修改note*/
router.post('/notes/edit', function(req, res, next) {
    if(!req.session.user){
        return res.send({status:1,errorMsg:'请先登录'})
    }

    var uid = req.session.user.id
    Note.update({text: req.body.note} , {where:{id:req.body.id,uid:uid}})
        .then(() => {
            console.log(arguments)
            res.send({status:0})
        }).catch(() => {
            res.send({status:1,errorMsg:"数据库出错啦！"})
        })
});

/*删除note*/
router.post('/notes/delete', function(req, res, next) {
    if(!req.session.user){
        return res.send({status:1,errorMsg:'请先登录'})
    }
    var uid = req.session.user.id

    Note.destroy({where:{id:req.body.id,uid:uid}})
        .then(() => {
            res.send({status:0})
        }).catch(() => {
            res.send({status:1,errorMsg:"数据库出错啦！"})
        })
    console.log('delete')
});

module.exports = router;
