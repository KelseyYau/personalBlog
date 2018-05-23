function init(){
    // on load
    $(".loader-holder").fadeOut(1000, function() {
        $("#main").animate({
            opacity: "1"
        }, 1000);
    });
}

init();