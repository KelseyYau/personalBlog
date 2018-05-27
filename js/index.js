function init(){
    // on load
    $(".loader-holder").fadeOut(500, function() {
        $("#main").animate({
            opacity: "1"
        }, 500);
    });

    // load image
    var bgImg = $(".bg");
    bgImg.each(function(a){
        if ($(this).attr("data-bg")){
            $(this).css("background-image",`url(${$(this).data("bg")})`);
        }
    })
}

init();