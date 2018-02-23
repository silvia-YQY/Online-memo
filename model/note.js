const Sequelize = require('sequelize');
const path = require('path')

const  sequelize = new Sequelize(undefined, undefined,undefined, {
  host: 'localhost',
  dialect: 'sqlite',

  storage: path.join(__dirname,'../database/database.sqlite')
});
/*
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  */


 const  Note = sequelize.define('note', {
    text: {
      type: Sequelize.STRING
    }
 });

 /*
 删除表
 Note.drop()
 */
 /*
创建
 Note.sync().then(() => {  //若不存在就执行下面
    Note.create({text:'hello world'})  //创建表格
 }).then(() =>{
    Note.findAll({raw:true}).then((notes) => {  //查询全部
        console.log(notes)
    })
 })
*/

/*
查询
Note.findAll({raw:true,where:{id:2}}).then((notes) => {
    console.log(notes)
})
*/

/*
Note.destroy({raw:true,where:{id:2}}).then(() => {
    console.log('delete note')
})
*/


module.exports = Note


