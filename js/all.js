$(document).ready(function(){
  var showSkill = false;

  
  //使點擊三大重點後滑動到位，而不是瞬間改變位置
  $('.scrollTop').click(function(e){
    e.preventDefault(); 
    //點擊功能有預設一個瞬間改變位置的效果。這個效果在作用時會閃一下
    //雖然在大部分瀏覽器不會顯現出來，但是還是用e.preventDefault(); 把他取消較佳

    var target = $(this).attr('href');
    var targetPos = $(target).offset().top;
    $('html, body').animate({scrollTop: targetPos}, 1000);
  });
  

  
  $(window).scroll(function(){
    
    //scrollPos為當前滾動的位置
    var scrollPos = $(window).scrollTop();

    //windowHeight視窗的高度
    var windowHeight = $(window).height();
    // console.log(scrollPos, windowHeight);
    
    //指定每個帶有scrollTop的標籤
    //三大重點都有.scrollTop，所以每次執行這個function都會一次讀三個值
    $('.scrollTop').each(function(){

      //每一個帶有scrollTop的標籤的href中的值，目前所指的東西就是ID
      var target = $(this).attr('href'); 

      //每一個帶有scrollTop的標籤的位置
      var targetPos = $(target).offset().top;

      //每一個帶有scrollTop的標籤的高度
      //outerHeight是表示連padding也包含在內的高度
      var targetHeight = $(target).outerHeight();


      //如果帶有scrollTop的標籤的位置小於當前滾動的位置
      //而且帶有scrollTop的標籤的位置加上高度會大於當前滾動的位置
      //也就是滑動到scrollTop的標籤的範圍內
      if (targetPos - 1 <= scrollPos && (targetPos + targetHeight) > scrollPos){
        //都先刪除active
        $('.scrollTop').removeClass('active')
        
        //滑動到哪裡就把哪裡加上active
        $(this).addClass('active');
        // console.log('新增active');
      } else {
        //如果不在scrollTop的標籤的範圍內的話就移除active
        $(this).removeClass('active')
        // console.log('刪除active');
      }
    });
    
    // progress bar
    var skillTop = $('#skills').position().top;
    // console.log('skillTop', skillTop);
   
    //技能熟練度的動畫
    if (skillTop <= (scrollPos + windowHeight / 2) && !showSkill) {
      showSkill = true;
      
      //讀取所有.progress-bar
      $('#skills .progress-bar').each(function(){

        //獲得data-progress中的值
        var thisValue = $(this).data('progress');
        console.log('thisValue', thisValue);

        //增加一個寬度的屬性
        $(this).css('width', thisValue + '%');
      });
    }
    
    // animated
    //滑到定位就會跳出圖案的動畫效果
    $('.animated').each(function(){
      var thisPos = $(this).offset().top;
      if((windowHeight + scrollPos) >= thisPos) {
         $(this).addClass('fadeIn');
      }
    });
    
    // bg scroll 
    //讓圖片上下移動
    //(scrollPos / 2)表示每往下滾1單位，圖片就會往上0.5單位。每往上滾1單位，圖片就會往下0.5單位
    // $('#profiles').css('background-position-y', -(scrollPos / 2) + 'px')  讓背景圖滾動的效果，目前用不到
    //translate(x,y) 可以同時設定x及y的變化translateX()則是只設定x的變化
    $('#header-ele').css('transform', 'translate( ' + (-scrollPos / 14) + 'px,' + (scrollPos / 2) + 'px)' )

    // $('#header-ele').css('transform', 'translateX( ' + (scrollPos / 2) + 'px )' )
    
    

    

    var profilesPos = $('#profiles').offset().top;
    var saladPos = $('.salad-Img').offset().top;
    movingDistance = scrollPos - profilesPos
    

    //之所以不用transform而是用background-position，是因為圖片的CSS是用transform來做設定
    //如果js也用transform來寫的話會把CSS的設定蓋過去，造成圖片位置錯誤
    //而background-position的缺點是當位置超過section的範圍時會自動被切掉
    $('.food-ele1').each(function(i){
      //往下越往下滑scrollPos的數值就會越大，所以用110是要讓圖片可以滑到更下方。
      if (scrollPos >= profilesPos && scrollPos < saladPos + 100){
        speed = [30, 40, 35, 30]
        $(this).animate({"background-position-y": movingDistance + 'px'}, speed[i])
        console.log('speed[i]:',speed[i]);
      }
    });
      

    $('.food-ele2').each(function(i){
      if (scrollPos >= profilesPos && scrollPos < saladPos + 80){
        speed = [40, 33, 30, 35]
        $(this).animate({"background-position-y": movingDistance + 'px'}, speed[i])
        console.log('speed[i]:',speed[i]);
      }
    });

      
  });
  
  
});