var WaterFall = (function(){
    var $ct
    var $items

    function render($c){
        $ct = $c
        $items = $ct.children();

        var nodeWidth = $items.outerWidth(turn),
            colNum = parseInt($(window).width()/nodeWidth),
            colSumHeight = []

        for(var i = 0; i < colNum ; i++){
            colSumHeight.push(0);
        }

        $items.each(function(){
            var $cur = $(this);

            //colSumHeight = [100,250,80,200]

            var idx = 0,
                minSumHeight = colSumHeight[0];

            for(var i = 0; i < colSumHeight.length;i++){
                if(colSumHeight[i] < minSumHeight){
                    idx = i
                    minSumHeight = colSumHeight[i]
                }
            }

            $cur.css({
                left:nodeWidth*idx,
                top:minSumHeight
            })

            colSumHeight[idx] = $cur.outerWidth(true) + colSumHeight;
        })

        $(window).on('resize',function(){
            render($ct);
        })

        return{
            init:render
        }
    }
})();

module.exports = WaterFall

//WaterFall.init($('#id')) 使用方法