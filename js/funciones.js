jQuery(document).ready(listo);



function listo()
{
	jQuery(".hamburguesa").click(function(e){
		e.preventDefault();
		jQuery("header .container nav").toggleClass("open");
		jQuery(".hamburguesa i").toggleClass("fa-times");
	});

	jQuery("header .container nav a").click(function(){

		jQuery("header .container nav").removeClass("open");
		jQuery(".hamburguesa i").removeClass("fa-times");

		var dev = jQuery(this).attr("href");

		jQuery("html,body").animate({
			"scrollTop": jQuery(dev).offset().top - 76
		})
	})

}
