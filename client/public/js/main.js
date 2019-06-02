$(window).scroll(function(){
	if($('.landing nav').offset().top > 147){
		console.log($(window).scrollTop());
		$('.landing nav').addClass('top-nav-collapse');
	} else{
		$('.landing nav').removeClass('top-nav-collapse');
	}
});