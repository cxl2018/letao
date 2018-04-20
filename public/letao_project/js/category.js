$(function () {
  mui('.lt_left').scroll();

  var rightScroll = mui('.lt_right').scroll();
  var baseUrl = "http://127.0.0.1:3000";

  loadCategory();

  function loadCategory() {
    // /category/queryTopCategory
    $.ajax({
      url: baseUrl + "/category/queryTopCategory",
      type: "get",
      success: function (result) {
        var html = template("leftMenuTpl", result);
        $(".lt_left>ul").html(html);
        // $(".lt_left li:nth-child(0)").addClass("active");
        $(".lt_left>ul>li").eq(0).addClass("active");
        query2category(result.rows[0].id);


      }
    });
  }

  function query2category(id) {
    $.ajax({
      url: baseUrl + "/category/querySecondCategory?id=" + id,
      type: "get",
      success: function (result) {
        result.baseUrl = baseUrl;
        var html = template("rightProTpl", result)
        $(".lt_right>ul").html(html);
        $(".loading").hide();
      }
    })

  }

  $(".lt_left").on("click", "a", function (e) {
    $(".loading").show();
    $(this).parent().addClass("active").siblings().removeClass("active");
    var id = $(this).data("id");
    query2category(id);
    rightScroll.scrollTo(0, 0, 100);

  });

})