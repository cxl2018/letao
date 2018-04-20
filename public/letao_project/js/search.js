$(function () {
  mui('.mui-scroll-wrapper').scroll({
  });
  var localHelper = storageLeTaoSearch("LTSearch");
  loadHistory();
  function loadHistory() {
    var arr = localHelper.getArr();
    // <li> <a href="javascript:;"><span class="key_word"> </span><span class="mui-icon mui-icon-closeempty"></span> </a> </li>
    var strArr = [];
    for (var i = 0; i < arr.length; i++) {
      strArr.push(' <li> <a href="javascript:;"><span class="key_word">' + arr[i] + '</span><span class="mui-icon mui-icon-closeempty close_key"></span> </a> </li>')
    }
    $(".search_item>ul").html(strArr.join(''));
  }


  $("#search_btn").on("tap", function () {
    var val = $("#search_txt").val();
    localHelper.push(val);
    loadHistory();

    //发送请求
    var paramObj={
      proName:val,
      page:1,
      size:10
    };
    loadQueryProducts(paramObj);
  });

  $(".search_item").on("tap", ".close_key", function () {
    var val = $(this).prev().html();
    localHelper.removeItem(val);
    console.log(val);

    loadHistory();
  });

  $(".s_clear").on("tap", function () {
    localHelper.clear();
    loadHistory();
  });

  $(".lt_order_bar a").on("tap",function () {
    
  });


  function loadQueryProducts(paramObj) {
    $.ajax({
      url:"/product/queryProduct",
      data:paramObj,
      type:"get",
      success:function (result) {
        // console.log(result);
        var html=template("productTpl",result);
        $(".lt_product").html(html);
      }
    });
    
  }



  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
      up : {
        height:50,//可选.默认50.触发上拉加载拖动距离
        auto:true,//可选,默认false.自动上拉加载一次
        contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        callback :function () {
          console.log(123);
          this.endPullupToRefresh();
        }
      },
      down: {
        auto:true,
        callback: function(){
          console.log(12344)
          this.endPulldownToRefresh();
        }
    },
    }
  });


})