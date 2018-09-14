$(function(){
    /*1. 不能垂直居中*/
    /*2. 设置背景颜色*/
    /*3. 设置导航功能*/
    $('.container').fullpage({
        verticalCentered: false,
        sectionsColor:["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        navigation:true, //是否显示导航栏
        scrollingSpeed:1000, //滚动的时间
        // 在页面结构加载后执行的回调函数
        afterRender: function(){
            //修改HTML结构 之后绑定事件
            $('.more').on('click', function(){
                //切换到下一屏
                $.fn.fullpage.moveSectionDown();
            });
            //第四屏的购物车监听动画结束的时候 去执行地址相关动画
            $('.section:nth-child(4) .cart').on('animationend',function () {
                //1. 提示文字改变
                $('.section:nth-child(4) .text img:last-child').fadeIn();
                //2. 收货地址改变
                $('.section:nth-child(4) .address').fadeIn(function () {
                    $('.section:nth-child(4) .address img:last-child').fadeIn();
                });
            });
               /*在第八屏手跟着鼠标移动*/
               $('.section:nth-child(8)').on('mousemove',function(e){
                /*获取鼠标的当前位置 坐标*/
                /*设置给手定位 注意：基于wrapper 不行 要基于全屏容器 section*/
                $(this).find('.hand').css({
                    left:e.clientX,
                    top:e.clientY + 20
                });
            }).on('click','.again',function () {
                /*再来一次*/
                /*1. 返回到第一屏*/
                $.fn.fullpage.moveTo(1);
                /*2. 重置所有的动画*/
                /*刷新页面 可以，但是：重新加载资源  降得用户体验  加大服务器压力 */
                //location.reload();
                /*1. 加了now做动画*/
                $('.section').removeClass('now');
                /*2. 加了animated做动画*/
                $('.animated').removeClass('animated');
                /*3. jquery的fade相关*/
                $('.section [style]').removeAttr('style');
            });
        },
           // 离开前
        onLeave: function (index, nextIndex, direction){
            $('.more').fadeOut(100);
            //离开的时候做动画
            // 条件 是第二屏 掉到第三屏 做动画
            if(index==2 &&nextIndex ==3){
                $('.section:nth-child(2)').find('.sofa').addClass('animated');
            }
            // 条件是第三屏掉到第四屏 做动画
            else if(index == 3 && nextIndex===4){
                $('.section:nth-child(3)').find('.sofa').addClass('animated');
            }
             // 条件是第三屏掉到第四屏 做动画
             else if(index == 5 && nextIndex===6){
                $('.section:nth-child(5)').find('.blank img:last-child').addClass('animated');
            }
              //条件 是第五屏掉到第六屏 做动画
              else if(index === 5 && nextIndex === 6){
                $('.section:nth-child(5)').find('.card img:last-child').addClass('animated');
                $('.section:nth-child(6)').find('.box').addClass('animated');
            }
        },
        //到到后
        afterLoad: function(link, index){
            if(index!=8){
                $('.more').fadeIn(100);
            }
             //执行当前屏幕中的动画  动画可能有很多
            //通过一个简单的JS操作(一个开关) 去控制所有动画的执行
            //通过一个类名控制所有的动画
            $('.section').eq(index-1).addClass('now');

                //使用jquery的淡入
                if(index ==7){
                    $('.section .star img').each(function (i,item) {
                        /*fadeIn fast200 normal 400 slow 700 */
                        $(item).delay(i*500).fadeIn(500);
                    });
                }
        }
    });
   
});
