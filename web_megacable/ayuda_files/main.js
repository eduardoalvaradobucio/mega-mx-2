// JavaScript Document
var submenu_activo ='x';
var supermenu_activo ='x';
var menu_correo_activo = 0;
var menu_cuenta_activo = 0;
var pivot_supermenu_activo ='x';
var chect_time = 500;
var footer_open = 0;
var on_resize = 0;
var timeout;


function end_resize(){
	if(on_resize==0){
		$("#slide_next").click();
		clearTimeout(timeout);
	}else{
		on_resize=0;
		timeout = setTimeout("end_resize()", 500);
	}
}


$(window).resize(function(){
//	alert("ok");
	on_resize = 1;
	var curr_width = $("body").width();
	$("#slide .items div").css('width', curr_width+'px');
	timeout = setTimeout("end_resize()", 500);
});


function close_block_bg(){
	$("#ver_canal").hide();
	$("#selecion_zona").hide();	
	$('#menu_emulation').hide();
	$('#mi_cuenta_hover').hide();
	$('#mi_correo_hover').hide();  
	$("#block_bg").hide();	
}

function check_submenu(){
	if(submenu_activo=='x' && supermenu_activo=='x' && pivot_supermenu_activo=='x'){
		$('#sub_menu').slideUp(200, function(){
			$('#'+pivot_supermenu_activo).hide();
			$('#'+supermenu_activo).hide();
			$('.menu_submenu a').removeClass('submenu_selected');					
		});
		$('.menu_option').removeClass('menu_selected');
	}
}

function check_supermenu(){
	if(supermenu_activo=='x'){
		$('#'+pivot_supermenu_activo).hide();
		$('.menu_submenu a').removeClass('submenu_selected');		
		pivot_supermenu_activo='x';
	}
}

function check_correo(){
	if(menu_correo_activo==0){
		$('#mi_correo_hover').animate({top:'50px'},200, function(){
			$(this).hide();
			$('#menu_emulation a').css('color','#FFF');
			$('#menu_emulation').hide();
			$('#block_bg').hide();
		});		
	}
}

function check_cuenta(){
	if(menu_cuenta_activo==0){
		$('#mi_cuenta_hover').animate({top:'50px'},200, function(){
			$(this).hide();
			$('#menu_emulation a').css('color','#FFF');
			$('#menu_emulation').hide();
			$('#block_bg').hide();
		});	
	}
}


function open_footer(){
	if(footer_open == 2){
		$("#footer").animate({height: "250px"}, function(){
			$.scrollTo("#colofon", 400);
			footer_open=1;
		});
	}
}

function open_channel(link_obj){
    $("#block_bg").show();
	$("#detalle_canal").load($(link_obj).attr("href"), function(){
		$("#ver_canal").fadeIn();
	});
	
	return false;
}



$(function(){
	
	$('#envia_chat').click(function(event){
		event.preventDefault();
		$("#QuestionEntry").submit();
	});
	
	
	$("html").keyup(function(event) {
	  if ( event.which == 27 ) {
			close_block_bg();
	   }
	});
	
	$("#block_bg").click(function(event){
		//console.log(event.target.id+" - "+event.target.className);
		if(event.target.className=='half' || event.target.id=='selecion_zona' || event.target.id=='ver_canal'){
			close_block_bg();
		}
//		if(event.target)
	});
	

	$('.menu_option').hover(function(){ 
		submenu_activo = $(this).attr('rel');
		if(submenu_activo  != 'x'){
			$('div.menu_submenu').hide();
			$('#'+submenu_activo).show();
			$('#sub_menu').show();
			$(this).addClass('menu_selected')
		}
	}, function(){
		submenu_activo='x';
		setTimeout('check_submenu()', chect_time);
	});
	
	$('.menu_submenu').hover(function(){
		submenu_activo=$(this).attr('id');
	}, function(){
		submenu_activo='x';
		setTimeout('check_submenu()', chect_time);
	});
	

	$('.menu_submenu a').hover(function(){
		supermenu_activo=$(this).attr('rel');
		
		$('.menu_submenu a').removeClass('submenu_selected');		
		$(this).addClass('submenu_selected');
		
		if(pivot_supermenu_activo !='x'){
			$('#'+pivot_supermenu_activo).hide();
					pivot_supermenu_activo='x';			
		}
			pivot_supermenu_activo = supermenu_activo;
		
		if(supermenu_activo  != 'x'){
			$('#'+supermenu_activo).show();
		}		
	}, function(){
		supermenu_activo = 'x';
		setTimeout('check_supermenu()', chect_time);
	});

	$('.super_menu').hover(function(){
		submenu_activo=$(this).parent().attr('id');
		
		supermenu_activo=$(this).attr('id');
		
	}, function(){
		supermenu_activo='x';
		setTimeout('check_supermenu()', chect_time);

		submenu_activo='x';
		setTimeout('check_submenu()', chect_time);
		
	});
	
	$('#mi_cuenta').click(function(event){
		event.preventDefault();
		$('#menu_emulation').show();
		$('#emu_correo').css('color','#7f7f7f');
		$('#block_bg').show();
		$('#mi_cuenta_hover').show();
		$('#mi_cuenta_hover').animate({top:'24px'},200);
		
	});
	
	$('#mi_correo').click(function(event){
		event.preventDefault();		
		$('#menu_emulation').show();
		$('#emu_cuenta').css('color','#7f7f7f');
		$('#block_bg').show();
		$('#mi_correo_hover').show();
		$('#mi_correo_hover').animate({top:'24px'},200);
	});
	
	$('#emu_correo').hover(function(){
		if(menu_cuenta_activo==0){		
			menu_correo_activo = 1;
		}
	}, function(){
		if(menu_cuenta_activo==0){		
			menu_correo_activo = 0;
			setTimeout('check_correo()', chect_time);		
		}
	});	
	
	$('#mi_correo_hover').hover(function(){
		if(menu_cuenta_activo==0){		
			menu_correo_activo = 1;
		}
	}, function(){
		if(menu_cuenta_activo==0){		
			menu_correo_activo = 0;
			setTimeout('check_correo()', chect_time);		
		}
	});
	
	$('#emu_cuenta').hover(function(){
		if(menu_correo_activo==0){		
			menu_cuenta_activo = 1;
		}
	}, function(){
		if(menu_correo_activo==0){		
			menu_cuenta_activo = 0;
			setTimeout('check_cuenta()', chect_time);
		}
	});	
	
	$('#mi_cuenta_hover').hover(function(){
		if(menu_correo_activo==0){
			menu_cuenta_activo = 1;
		}
	}, function(){
		if(menu_correo_activo==0){
			menu_cuenta_activo = 0;
			setTimeout('check_cuenta()', chect_time);		
		}
	});			
	
	
	
	$('#lugar').click(function(event){
		event.preventDefault();
		$('#block_bg').show();
		$('#selecion_zona').fadeIn();
	});
	
	$('.close_zona').click(function(event){
		event.preventDefault();
		close_block_bg();
	});
	

	
	
	$(".seccion_home").hover(function(){
			if($.browser.msie){
				$('img', this).show();
			}else{
				$('img', this).fadeIn();
			}
			$('.seccion_home_texto', this).animate({opacity:'0.7'});
	}, function(){
			if($.browser.msie){
				$('img', this).hide();
			}else{
				$('img', this).fadeOut();
			}
			$('.seccion_home_texto', this).animate({opacity:'1'});
	});
	
	$('#banner_scroll').scrollable({circular: true, mousewheel: true}).navigator().autoscroll({
		interval: 4800, autopause:true
	});
	
	var curr_width = $("body").width();
	$("#slide .items div").css('width', curr_width+'px');
	
	$('#slide').scrollable({circular: true, mousewheel: true, next: '#slide_next', prev:'#slide_prev'}).navigator({navi: '.navi_home', indexed:true, idPrefix:'slide_nav_'}).autoscroll({
		interval: 10000, autopause:true
	});	
	
	$("#slide_prev").hide();
	$("#slide_next").hide();
	
	$('#slide_right').hover(function(){
		if($.browser.msie){		
			$("#slide_next").show();
		}else{
			$("#slide_next").fadeIn();
		}
	}, function(){
		if($.browser.msie){		
			$("#slide_next").hide();
		}else{
			$("#slide_next").fadeOut();
		}
	});

	$('#slide_left').hover(function(){
		if($.browser.msie){		
			$("#slide_prev").show();
		}else{
			$("#slide_prev").fadeIn();
		}
		
	}, function(){
		if($.browser.msie){		
			$("#slide_prev").hide();
		}else{
			$("#slide_prev").fadeOut();
		}
	});	

//	$('#slide').nivoSlider();
	$(".navi_home a").hover(function(){
		var nav_selector = $(this).attr("id");
		nav_selector = nav_selector.replace(/slide_nav_/i, "")
		nav_selector;
		$('#tooltip_nav').show();
		$('#tooltip_nav').css("left", ((nav_selector*16)-38)+"px");
		$('#tooltip_imgs').css("left", (nav_selector*-79)+"px");
	}, function(){
		var nav_selector = $(this).attr("id");
		$('#tooltip_nav').hide();
	});



/*	$("#footer_selection").hover(function(){
		setTimeout("open_footer()", 500);
		footer_open = 2;
	}, function(){
		if(footer_open==1){
			$("#footer").animate({height: "48px"});
			footer_open=0;			
		}else if(footer_open==2){
			footer_open=0			;
		}
			
	});*/
	

});