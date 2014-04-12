(function(){
  var $ = Zepto;
  $(document).ready(function(){
    $(".menubutton").on("click", function(){
      $("header nav").toggle();
    });
  });
})();
