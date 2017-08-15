require('./css/style.scss');

var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d');

var clear_but = document.getElementById('clear_canvas'),
	colors = document.querySelectorAll('.canvas__colors'),
	color_selected = document.querySelectorAll('.canvas__colors__selected'),
	range = document.getElementById('range'),
	prev = document.getElementById('prev'),
	next = document.getElementById('next');

canvas.width = 500;
canvas.height = 500;

var painting = false;
var width = parseInt(range.value, 10);
var images_array = window.localStorage.canvasImages = [],
	current_image = 0;

canvas.addEventListener('mousedown', () => {
	painting = true;
});

canvas.addEventListener('mouseup', () => {
	painting = false;
	current_image++;
	if(current_image < images_array.length){
		images_array.splice(current_image, images_array.length);
	}
	images_array.push(canvas.toDataURL());
});

canvas.addEventListener('mousemove', (e) => {
	if(painting){
		var X = e.offsetX,
			Y = e.offsetY;
		ctx.fillStyle = get_color();
		ctx.beginPath();
		ctx.arc(X, Y, width/10, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}
});

clear_but.addEventListener('click', () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	window.localStorage.clear();
	images_array.splice(0, images_array.length);
});

range.addEventListener('change', () => {
	width = parseInt(range.value, 10);
});

prev.addEventListener('click', () => {
	current_image--;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var img = new Image(); 
	if (current_image < 0) {
		current_image = 0;
	};
	img.src = images_array[current_image]; 
	img.onload = function() { 
	  ctx.drawImage(img, 0, 0); 
	} 
});

next.addEventListener('click', () => {
	var img = new Image(); 
	current_image++;
	if(current_image > images_array.length - 1){
		current_image--;
	}
	img.src = images_array[current_image]; 
	img.onload = function() { 
	  ctx.drawImage(img, 0, 0); 
	} 
});

function loadCanvas() {
	var img = new Image(); 

	if(window.localStorage != null){
		img.src = window.localStorage.canvasImage; 
		img.onload = function() { 
		  ctx.drawImage(img, 0, 0); 
		} 
	}
}

function get_color() {
	for(let i = 0; i < colors.length; i++){
		if(colors[i].classList.contains('selected')){
			return colors[i].getAttribute('data');
		}
	}
}

function color_change(item, item_selected) {
	return function() {
		for(let i = 0; i < colors.length; i++){
			if(colors[i].classList.contains('selected')){
				colors[i].classList.remove('selected');
				color_selected[i].style.display = 'none';
			}
		}
		item.style.width = '27px';
		item.style.height = '27px';
		item.classList.add('selected');
		item_selected.style.display = 'block';
	}
}

window.addEventListener('load', () => {
	loadCanvas();
	for(let i = 0; i < colors.length; i++){
		colors[i].addEventListener('click', color_change(colors[i], color_selected[i]), false);
		if(colors[i].classList.contains('selected')){
			color_selected[i].style.display = 'block';
		}
	}
});

