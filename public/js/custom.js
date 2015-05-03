function clearDropImages() {
	$(".dz-message").show();
	$(".col-md-4 .dz-preview").remove();
}
jQuery(document).ready(function() {
	$(".nail_temp").on('mouseenter',function() {
	$(this).find('.whiteHover').each(function (i,val) {
		$(val).show();
	});
	});
	$(".nail_temp").on('mouseleave',function() {
	$(this).find('.whiteHover').each(function (i,val) {
		$(val).hide();
	});
	});
	$("#navbarInput-01").on('keyup',function(){
		reloadImages($("#navbarInput-01").val());
	});
});
function reloadListeners() {
	$(".nail_temp").on('mouseenter',function() {
	$(this).find('.whiteHover').each(function (i,val) {
		$(val).show();
	});
	});
	$(".nail_temp").on('mouseleave',function() {
	$(this).find('.whiteHover').each(function (i,val) {
		$(val).hide();
	});
	});
}
function deleteImage(imageName) {
	$.ajax({
		url:'/api/deleteImage?imageName='+imageName,
		method:'GET',
		async:false,
		success: function(data) {
			reloadImages("");	
		}
	});
}
function reloadImages(searchTerm) {
	$.ajax({
		url:'/api/listPics?sName='+searchTerm,
		method:'GET',
		async:false,
		success: function(data) {
			var data=JSON.parse(data);
			$(".col-md-8").empty();
			$.each(data, function(i, val) {
				var putHTML='<div style="min-height:0px; padding:0px 0px 0px 0px; border:none;" class="nail_temp dropzone"><div class="nailthumb-container dz-preview dz-processing dz-success dz-complete dz-image-preview"><a href="'+val.path+'" data-lightbox="image-1" data-title="'+val.imageName+'" class="dz-image"><img src="'+val.path+'" height="120"></a></div><div style="display: none;" class="whiteHover"><span id="trashHover" style="left:15px;" onclick="deleteImage(\''+val.imageName+'\');" class="glyphicon glyphicon-trash"></span><span id="heartHover" style="left:40px; top:2px;" onclick="fbShare(\''+val.path+'\', \'Fb Share\', \'Facebook share popup\', \'\', 520, 350)" class="fui-facebook"></span><span id="heartHover" style="left:65px;top:2px;" onclick="googleShare(\''+val.path+'\', \'Google Share\', \'Google share popup\', \'\', 520, 350)" class="fui-google-plus"></span><span id="heartHover" style="left:90px;top:2px;" onclick="twitterShare(\''+val.path+'\', \'Twitter Share\', \'Twitter share popup\', \'\', 520, 350)" class="fui-twitter"></span></div></div>';
				$(".col-md-8").append(putHTML);
			});
			reloadListeners();
			
		}
	});
}
function fbShare(url, title, descr, image, winWidth, winHeight) {
		url=window.location.href+url;
        var winTop = (screen.height / 2) - (winHeight / 2);
        var winLeft = (screen.width / 2) - (winWidth / 2);
        window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url + '&p[images][0]=' + image, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
    }
function twitterShare(url, title, descr, image, winWidth, winHeight) {
		url=window.location.href+url;
        var winTop = (screen.height / 2) - (winHeight / 2);
        var winLeft = (screen.width / 2) - (winWidth / 2);
        window.open('https://twitter.com/share?url='+url+'&via=Imagography&text=', 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
    }
function googleShare(url, title, descr, image, winWidth, winHeight) {
		url=window.location.href+url;
        var winTop = (screen.height / 2) - (winHeight / 2);
        var winLeft = (screen.width / 2) - (winWidth / 2);
        window.open('https://plus.google.com/share?url='+url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
    }
