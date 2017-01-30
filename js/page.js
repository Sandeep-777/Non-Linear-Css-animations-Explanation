var text_1x;
var text_1y;
var text_2x;
var text_2y;
$(document).ready(function(){     
	var canvas = document.getElementById("myCanvas");
    var canvas_2 = document.getElementById("curveCanvas");
    var canvas_3 = document.getElementById("gridCanvas");
   	input_box('.ip_time', 5);
    if (canvas.getContext && canvas_2.getContext){
    	//initialize canvas 1
		ctx = canvas.getContext("2d");
		var canvasheight = Math.round($('.grids').height() * 1);
		var canvaswidth = Math.round($('.grids').width() * 1);
		var circle_radius = Math.round(canvaswidth * 0.04);
		// for circle 1
		var circle1_x = 0.3 * canvaswidth;
		var circle1_y = canvasheight*12/20;
		var circle1_color = "#FF7F7F";
		// for circle 2
		var circle2_x = canvaswidth*0.8;
		var circle2_y = canvasheight*8/20;;
		var circle2_color = "#7F92FF";
		canvas.height = canvasheight;
		canvas.width = canvaswidth;
		canvas_init();
		
		//initialize canvas 2
		ctx_2 = canvas_2.getContext("2d");
		var canvasheight_2 = Math.round($('.grids').height() * 1);
		var canvaswidth_2 = Math.round($('.grids').width() * 0.8);
		canvas_2.height = canvasheight_2;
		canvas_2.width = canvaswidth_2;
		canvas_2_init();
		
		//initialize canvas 3
		ctx_3 = canvas_3.getContext("2d");
		var canvasheight_3 = Math.round($('.grids').height() * 1);
		var canvaswidth_3 = Math.round($('.grids').width() * 1.2);
		canvas_3.height = canvasheight_3;
		canvas_3.width = canvaswidth_3;
		canvas_3_init();
	    
	    ctx.beginPath();
	    ctx.strokeStyle = '#0026FF';
		ctx.moveTo(canvas.width*0.2,canvas_2.height*0.75);
		ctx.bezierCurveTo(circle1_x, circle1_y, circle2_x, circle2_y, canvas.width, canvas_2.height*0.25);
		ctx.stroke();	
		
        text_1x = Math.round(((circle1_x-canvas.width*0.2)/0.8/canvas.width)*100)/100;
        text_1y = Math.round((2*(canvas.height*0.75 - circle1_y)/canvas.height)*100)/100;
        text_2x = Math.round(((circle2_x-canvas.width*0.2)/0.8/canvas.width)*100)/100;
	    text_2y = Math.round((2*(canvas.height*0.75 - circle2_y)/canvas.height)*100)/100;
	    
        $('.b1_text').html('Control points positions: (' + text_1x +', '+ text_1y+','+ text_2x +', '+ text_2y+')');
	             
		var mouseX = 0, mouseY = 0;
		var mousePressed = false;
		function getMousePos(canvas, evt) {
		 	var rect = canvas.getBoundingClientRect();
		 	return {
		 		x: evt.clientX - rect.left,
		 		y: evt.clientY - rect.top
		 	};
		}
		
		$('#myCanvas').mousedown(function(e){
			mousePressed = true;
			redraw(e);
		});

		$('#myCanvas').mousemove(function(e){
		 	redraw(e);
		});
		
		$('#myCanvas').mouseup(function(e){
			mousePressed = false;
		});
		function redraw(e) {
			var move1 = false;
			var move2 = false;				
		    var mousePos = getMousePos(canvas, e);
		    var that = mousePos;
	        if(mousePressed){
	            var left1 = circle1_x - circle_radius;
	            var right1 = circle1_x + circle_radius;
	            var top1 = circle1_y - circle_radius;
	            var bottom1 = circle1_y + circle_radius;
	            
	            var left2 = circle2_x - circle_radius;
	            var right2 = circle2_x + circle_radius;
	            var top2 = circle2_y - circle_radius;
	            var bottom2 = circle2_y + circle_radius;
	            
	            if (mousePos.x < right1 && mousePos.x > left1 && mousePos.y < bottom1 && mousePos.y > top1){       
		    		that.x = (that.x<canvas.width*0.2)?canvas.width*0.2:that.x;
		    		circle1_x = that.x;
		    		circle1_y = that.y;
		    		move1 = true;
	            }
	            else if (mousePos.x < right2 && mousePos.x > left2 && mousePos.y < bottom2 && mousePos.y > top2){       
		    		that.x = (that.x<canvas.width*0.2)?canvas.width*0.2:that.x;
		    		circle2_x = that.x;
		    		circle2_y = that.y;
		    		move2 = true;
	            }			          
	        }
	        if(move1){
		        draw_circles(that.x, that.y, circle2_x, circle2_y);
	        } 
	        if(move2){
		        draw_circles(circle1_x, circle1_y, that.x, that.y);
	        }
	        text_1x = Math.round(((circle1_x-canvas.width*0.2)/0.8/canvas.width)*100)/100;
	        text_1y = Math.round((2*(canvas.height*0.75 - circle1_y)/canvas.height)*100)/100;
	        text_2x = Math.round(((circle2_x-canvas.width*0.2)/0.8/canvas.width)*100)/100;
	        text_2y = Math.round((2*(canvas.height*0.75 - circle2_y)/canvas.height)*100)/100;
	        $('.b1_text').html('Control points positions: (' + text_1x +', '+ text_1y+','+ text_2x +', '+ text_2y+')');
	        
	        ctx.strokeStyle = '#0026FF';
    		ctx.beginPath();
			ctx.moveTo(canvas.width*0.2,canvas_2.height*0.75);
			ctx.bezierCurveTo(circle1_x, circle1_y, circle2_x, circle2_y, canvas.width, canvas_2.height*0.25);
			ctx.stroke(); 
	    }
		function canvas_init(){
			canvasheight = Math.round($('.grids').height() * 1);
			canvaswidth = Math.round($('.grids').width() * 1);
			circle_radius = Math.round(canvaswidth * 0.04);
			
			circle1_x = 0.3 * canvaswidth;
			circle1_y = canvasheight*12/20;
			
			circle2_x = canvaswidth*0.8;
			circle2_y = canvasheight*8/20;
			
			canvas.height = canvasheight;
			canvas.width = canvaswidth;
			
			draw_circles(circle1_x,circle1_y, circle2_x,circle2_y);
		}    
		function canvas_2_init(){
			canvasheight_2 = Math.round($('.grids').height() * 1);
			canvaswidth_2 = Math.round($('.grids').width() * 0.8);
			canvas_2.height = canvasheight_2;
			canvas_2.width = canvaswidth_2;
			ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height);
			for (var m=0; m<=5; m++){
	        	ctx_2.beginPath();
	        	ctx_2.strokeStyle = '#aaa';
	        	ctx_2.moveTo(m*canvas_2.width/5, canvas_2.height*0.25);
	        	ctx_2.lineTo(m*canvas_2.width/5, canvas_2.height*0.75);
	        	ctx_2.stroke();
			}
			for (var m=0; m<=5; m++){
	        	ctx_2.beginPath();
	        	ctx_2.strokeStyle = '#aaa';
	        	ctx_2.moveTo(0, canvas_2.height*(0.25+m*0.1));
	        	ctx_2.lineTo(canvas_2.width, canvas_2.height*(0.25+m*0.1));
	        	ctx_2.stroke();
			}
		}    
		
		function canvas_3_init(){
			canvasheight_3 = Math.round($('.grids').height() * 1);
			canvaswidth_3 = Math.round($('.grids').width() * 1.2);
			canvas_3.height = canvasheight_3;
			canvas_3.width = canvaswidth_3;
			ctx_3.save();
			ctx_3.translate( 0, canvas_3.height/2);
			ctx_3.rotate( 3* Math.PI / 2 );
        	ctx_3.fillStyle = '#7FC9FF';
        	ctx_3.font="3vmin Georgia";
			ctx_3.fillText( "progression", -canvas_3.height/10, canvas_3.width/20 );
			ctx_3.restore();
			
			for (var m=1; m<=6; m++){
				ctx_3.fillStyle = '#555555';
        		ctx_3.font="2vmin Georgia";
				ctx_3.fillText((m-1)*20+'%', m*canvas.width/6,canvas.height*0.78);
			}
			for (var m=1; m<=6; m++){
				ctx_3.fillStyle = '#555555';
        		ctx_3.font="2vmin Georgia";
				ctx_3.fillText((6-m)*20+'%', canvas.width/10, (0.25+(m-1)*0.1)*canvas.height);
			}
        	ctx_3.fillStyle = '#7FC9FF';
			ctx_3.font="3vmin Georgia";
			ctx_3.fillText("time elapsed", canvas.width*0.4, canvas.height*0.83);
		}
		
		function draw_circles(x1, y1, x2, y2){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
	        ctx.beginPath();
	        ctx.arc(x1, y1, circle_radius, 0, Math.PI*2, true);
	        ctx.fillStyle = circle1_color;
    		ctx.fill();
    		ctx.beginPath();
	        ctx.arc(x2, y2, circle_radius, 0, Math.PI*2, true);
	        ctx.fillStyle = circle2_color;
    		ctx.fill(); 
		}
	}
	
	$(window).resize(function() {
	  	canvas_init();
	  	canvas_2_init();
	  	canvas_3_init();
	});
	
	//animation function
	var sheet = window.document.styleSheets[0];
	sheet.insertRule('@keyframes mymove{from {left:0px;}to {left:500px;}}', sheet.cssRules.length);
	$('.push').css('animation','mymove 3s linear');
	
	$('.bt_3').click(function(){
		var time_val;
		time_val = $('.ip_time').val()||5;
		time_val = time_val + 's';
		var mbezier = '('+String(text_1x)+','+String(text_1y)+','+String(text_2x)+','+String(text_2y)+')';
		$('.ball').css({
			'-webkit-animation':  '',
			'animation': ''
		});
		setTimeout(function(){
			$('.ball').css({
				'-webkit-animation':  'move_y '+ time_val + ' cubic-bezier' + mbezier + ' infinite, move_x '+ time_val + ' linear infinite',
				'animation': 'move_y '+ time_val + ' cubic-bezier' + mbezier + ' infinite, move_x '+ time_val + ' linear infinite'
			});
		},100);
	});
	$('.bt_2').click(function(){
		var time_val;
		time_val = $('.ip_time').val()||5;
		time_val = time_val + 's';
		var mbezier = '('+String(text_1x)+','+String(text_1y)+','+String(text_2x)+','+String(text_2y)+')';
		$('.ball').css({
			'-webkit-animation':  '',
			'animation': ''
		});
		setTimeout(function(){
			$('.ball').css({
				'-webkit-animation':  'move_y '+ time_val + ' cubic-bezier' + mbezier + 'infinite',
				'animation': 'move_y '+ time_val + ' cubic-bezier' + mbezier + 'infinite'
			});
		}, 100);
	});
	$('.bt_1').click(function(){
		var time_val;
		time_val = $('.ip_time').val()||5;
		time_val = time_val + 's';
		$('.ball').css({
			'-webkit-animation':  '',
			'animation': ''
		});
		setTimeout(function(){
			$('.ball').css({
				'-webkit-animation': 'move_x '+ time_val + ' linear infinite',
				'animation': 'move_x '+ time_val + ' linear infinite'
			});
		}, 100);
	});
	
	function input_box(input_class, max_number) {
		$(input_class).keydown(function(event){
    		var charCode = (event.which) ? event.which : event.keyCode;
    		/* charCodes 8 => backspace, 48 - 57 => 0 -9, 97-105 => num(1-9), 37-40 => arrowkeys, 110=>., 190=>., 46=> del */
			var condition = charCode != 8 && (charCode < 37 || charCode > 40) && charCode != 46;
			//check if user inputs del, backspace or arrow keys
   			if (!condition) {
    			return true;
    		}
    		//check if user inputs more than one '.'
			if((charCode == 190 || charCode == 110) && event.target.value.split('.').length >= 2) {
        		return false;
    		}
    		//check . and 0-9 separately after checking arrow and other keys
    		if((charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105) && charCode != 190 && charCode != 110 ){
    			return false;
    		}
    		//check max no of allowed digits
    		if (String(event.target.value).length >= max_number) {
    			return false;
    		}
  			return true;
		});	
	}
});	