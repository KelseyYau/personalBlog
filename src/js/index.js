import "../css/reset.css";
import "../css/color.css";
import "../css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";

import 'jquery';
import 'bootstrap';
import  Snap from 'snapsvg';
// import classie from './classie.js';
// import './main4.js';

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
        interval: 5000,  
        wrap: true  
    }); 

    //share menu
    (function(){
        var isOpen = false;
        $('.show-share').click(
            function(){
                if(isOpen){
                    $('.show-list').css('opacity',0);
                }else{
                    $('.show-list').css('opacity',1); 
                }
                isOpen = !isOpen;
            }
        );
    })();
    
    //sliderbar menu
    (function(){
        var body = document.body,
        openbtn = document.getElementById('open-button'),
        isOpen = false,

        morphEl = document.getElementById('morph-shape');
        console.log(morphEl);
        var s = Snap( morphEl.querySelector('svg'));
        var path = s.select('path');
        var initialPath = path.attr('d');
        var steps = morphEl.getAttribute('data-morph-open').split(';');
        var stepsTotal = steps.length;
        var isAnimating = false;

        function initEvent(){
            openbtn.addEventListener('click',toggleMenu);

            
        }

        function toggleMenu(){
            if(isAnimating) return false;
            isAnimating = true;
            if(isOpen){
                $(body).removeClass('show-menu');
                $('.menu-top').removeClass('menu-top-click');
                $('.menu-middle').removeClass('menu-middle-click');
                $('.menu-bottom').removeClass('menu-bottom-click');

                //animate path
                setTimeout(() => {
                    path.attr('d',initialPath);
                    isAnimating = false;
                }, 300);
            }
            else{
               $(body).addClass('show-menu');
               $('.menu-top').addClass('menu-top-click');
               $('.menu-middle').addClass('menu-middle-click');
               $('.menu-bottom').addClass('menu-bottom-click');
                var pos = 0,
				nextStep = function( pos ) {
					if( pos > stepsTotal - 1 ) {
						isAnimating = false; 
						return;
					}
					path.animate( { 'path' : steps[pos] }, pos === 0 ? 400 : 500, pos === 0 ? mina.easein : mina.elastic, function() { nextStep(pos); } );
					pos++;
				};

			    nextStep(pos);
            }
            isOpen = !isOpen;
        }
        initEvent();
    })();

    // scroll nav and fixed side module
    (function(){
        var sideImage = $('.fbgs').data('bg');
        var navTxt = $('.fbgs').data('bgtex');
        
        $('.bg-scroll').css("background-image",`url(${sideImage})`);
    })();
}

init();