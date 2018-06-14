import "../css/reset.css";
import "../css/color.css";
import "../css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";

import 'jquery';
import 'bootstrap';
import  Snap from 'snapsvg';
import 'ol/ol.css';
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';

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
        $('.bg-title span').html(navTxt);
        var $sec2 = $('#sec2');
        var orinOffTop = $(".nav-list").offset().top;

        var $arrayTabA = $(".nav-list").find("a");
        var len = $arrayTabA.length;
        
        var arrayAttr = [];
        var attrObj = {};
        for(var i = 0;i<len;i++){
            
            var temp = $($arrayTabA[i]).attr('data-bgtex');
            arrayAttr.push($($arrayTabA[i]).attr('data-bgtex'));
            attrObj[$($arrayTabA[i]).attr('data-bgtex')] = $('#' + temp).offset().top;
            
            $($arrayTabA[i]).click(function(){
                var secAttr = $(this).attr('data-bgtex');
                var targetOffTop = $('#' + secAttr).offset().top;
                if(secAttr == 'sec2'){
                    $('html,body').animate({
                        scrollTop:orinOffTop
                    },1000);
                }else{
                    $('html,body').animate({
                        scrollTop:(targetOffTop-70)
                    },1000);
                    console.log(targetOffTop);
                }
                    
            });
        }

        // scroll interactive
        $('.to-top').click(()=>{
            $('html,body').animate({
                scrollTop:0
            },1000);
        });
        $(window).bind("scroll",function(){
            var scrollTopVal = $(this).scrollTop();
            if(scrollTopVal >= orinOffTop){
                $(".scroll-nav-holder").addClass('scroll-nav-fixed');
            }else{
                $(".scroll-nav-holder").removeClass('scroll-nav-fixed');
            }
            
            if(scrollTopVal >= orinOffTop-5 && scrollTopVal < (attrObj.sec3-150)){
                $($arrayTabA[0]).addClass('active-list');
            }
            else{
                $($arrayTabA[0]).removeClass('active-list');
            }

            if(scrollTopVal > (attrObj.sec3-150) && scrollTopVal < (attrObj.sec4-150)){
                $($arrayTabA[1]).addClass('active-list');
            }
            else{
                $($arrayTabA[1]).removeClass('active-list');
            }

            if(scrollTopVal > (attrObj.sec4-150) && scrollTopVal < (attrObj.sec5-150)){
                $($arrayTabA[2]).addClass('active-list');
            }
            else{
                $($arrayTabA[2]).removeClass('active-list');
            }

            if(scrollTopVal > (attrObj.sec5-150) && scrollTopVal < (attrObj.sec6-150)){
                $($arrayTabA[3]).addClass('active-list');
            }
            else{
                $($arrayTabA[3]).removeClass('active-list');
            }

            if(scrollTopVal > (attrObj.sec6-150) && scrollTopVal < $(".to-top").offset().top){
                $($arrayTabA[4]).addClass('active-list');
            }
            else{
                $($arrayTabA[4]).removeClass('active-list');
            }

        });

        //
        // map display
        new Map({
            target: 'map',
            layers: [
              new TileLayer({
                source: new XYZ({
                  url: 'http://ditu.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0'  
                })
              })
            ],
            view: new View({
              center: [0, 0],
              zoom: 2
            })
          });
    })();
}

init();