import "../css/reset.css";
import "../css/color.css";
import "../css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";

import 'jquery';
import 'bootstrap';

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
    });

    //carousel
    $("#myCarousel").carousel({  
        interval: 500000,  
        wrap: true  
    }); 

}

init();