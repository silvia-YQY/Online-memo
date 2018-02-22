var EventCenter = (function(){

    var events = {}

    function on (evt,handler){
        events[evt] = events[evt] || []

        events[evt].push({
            handler:handler
        })
    }

    function fire(evt,args){
        if(!event[evt]){
            return;
        }
        for(var i = 0; i < event[evt].length; i++){
            event[evt][i].handler(args);
        }
    }

    return{
        on:on,
        fire:fire
    }
})()

module.exports = EventCenter

// EventCenter.on('text-change',function(data){
//     console.log('on1:',data)
// });

// EventCenter.on('text-change',function(data){
//     console.log('on2:',data)
// })