require('less/note.less')

var Toast = require('./toast.js').Toast
var Event = require('mod/event.js')

/*
    {id:1 ,text:""}
*/

function Note(opts){
    this.initOpts(opts);
    this.createNote();
    this.setStyle();
    this.bindEvent();
}

Note.prototype = {
    colors:[
        ['#ea9b35','#efb04e'], //headColor , containerColor
        ['#dd598b','#e672a2'],
        ['#eee34b','#f2eb67'],
        ['#c24226','#d15a39'],
        ['#c1c341','#d0d25c'],
        ['#3f78c3','#5591d2']
    ],

    defaultOpts:{
        id:'',//Node id
        $ct: $('#content').length > 0? $('#content'):$('body'), //默认存放Note的容器
        context:'input here' //Note 的内容
    },

    initOpts:function(opts){
        this.opts = $.extend({}, this.defaultOpts, opts || {});
        if(this.opts.id){
            this.id = this.opts.id;
        }
    },

    createNote:function(){
        var tpl = `
        <div class="note">
            <div class="note-head">
                <span class="username"></span>
                <span class="delete">X</span>
            </div>
            <div class = "note-ct" contenteditable="true"></div>
        </div>
        `
        this.$note = $(tpl);
        this.$note.find('.note-ct').html(this.opts.context);
        this.$note.find('.username').text(this.opts.username);
        this.opts.$ct.append(this.$note);
        if(!this.id) this.$note.css('bottom','px')
    },

    setStyle:function(){
        var color = this.colors[Math.floor(Math.random()*6)] 
        this.$note.find('.note-head').css('background-color',color[0]);
        this.$note.find('.note-ct').css('background-color',color[1]);
    },

    setLayout:function(){
        var self = this;
        if(self.clock){
            clearTimeout(self.clock)
        }
        self.clock = setTimeout(function(){
            Event.fire('waterfall')
        },100)
    },

    bindEvent:function(){
        var self = this,
            $note = this.$note,
            $noteHead = $note.find('.note-head')
            $noteCt = $note.find('.note-ct')
            $delete = $note.find('.delete')

        $delete.on('click',function(){
            self.delete()
        })
        
        //contenteditable没有 change 事件，所以这做了模拟通过判断元素内容变动，执行save
        $noteCt.on('focus',function(){
            //console.log('html:' ,$noteCt.html())
            //console.log('this:',$(this))
            if($(this).html()=='input here') $(this).html('')
            $(this).data('before',$(this).html())
        }).on('blur paste',function(){
            if($noteCt.data('before') != $(this).html()){
                $noteCt.data('before', $(this).html());
                self.setLayout()
                if(self.id){
                    self.edit($(this).html())
                }else{
                    self.add($(this).html())
                }
            }
        })

        //设置笔记移动
        $noteHead.on('mousedown',function(e){
            var evtX = e.pageX - $note.offset().left  
                //evtX 计算事件的触发点在dialog内部到dialog的左边缘距离
                evtY = e.pageY - $note.offset().top
            $note.addClass('draggable').data('evtPos',{x:evtX,y:evtY})
            //把事件到dialog的边缘的距离保存下来
        }).on('mouseup',function(){
            $note.removeClass('draggable').removeData('pos')
        })

        $('body').on('mousemove',function(e){
            $('.draggable').length && $('.draggable').offset({
                top: e.pageY - $('.draggable').data('evtPos').y,
                left:e.pageX - $('.draggable').data('evtPos').x
                //当用户鼠标移动时，根据鼠标的位置和前面保存的距离，计算dialog的绝对位置
            })
        })

    },

    edit:function(msg){
        console.log('edit...')
        var self = this;
        $.post('/api/notes/edit',{
            id:this.id,
            note: msg 
        }).done(function(ret){
            if(ret.status === 0){
                Toast('修改成功');
            }else{
                Toast(ret.errorMsg);
            }
        })
    },

    add:function(msg){
        console.log('add...')
        var self = this
        $.post('/api/notes/add',{note:msg})
            .done(function(ret){
                if(ret.status === 0){
                    Toast('添加成功')
                }else{
                    self.$note.remove();
                    Event.fire('waterfall')
                    Toast(ret.errorMsg);
                }
            })

        //todo
    },

    delete:function(){
        var self = this
        $.post('/api/notes/delete',{id:this.id})
            .done(function(ret){
                if(ret.status === 0){
                    Toast('删除成功')
                    self.$note.remove()
                    Event.fire('waterfall')
                }else{
                    Toast(ret.errorMsg)
                }
            })
    }


}

module.exports.Note = Note