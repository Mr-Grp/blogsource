


	//nav部分开始
	var car=document.getElementsByClassName("car")[0];
	var shopcar=document.getElementsByClassName("shopcar")[0];
	car.onmouseover=function(){
		shopcar.style.height='96px';
		shopcar.style.color='#666';
		shopcar.style.boxShadow="0 2px 5px 3px rgba(100,100,100,0.1)"
	}
	car.onmouseout=function(){
		shopcar.style.height='0';
		shopcar.style.boxShadow="none"
	}
	//nav部分结束

	// shop-nav部分开始
	var search=document.getElementsByClassName("search")[0];
	var searchLogo=search.getElementsByTagName("span")[0];
	var searchInput=search.getElementsByTagName("input")[0];
	var searchA=search.getElementsByClassName("search-a")[0];
	
	search.onmouseover=function(){
		if(!search.classList.contains("current")){
			search.style.border='#aaa 1px solid';
			searchLogo.style.borderLeft='#aaa 1px solid';
		}
	}
	search.onmouseout=function(){
		if(!search.classList.contains("current")){
			search.style.border='#E0E0E0 1px solid';
			searchLogo.style.borderLeft='#E0E0E0 1px solid';
		}
	}
	searchInput.onfocus=function(){
		search.classList.add("current");
		search.style.border='#FF6700 1px solid';
		searchLogo.style.borderLeft='#FF6700 1px solid';
		searchA.style.display='none';
	}
	searchInput.onblur=function(){
		search.classList.remove("current");
		search.style.border='#E0E0E0 1px solid';
		searchLogo.style.borderLeft='#E0E0E0 1px solid';
		searchA.style.display='inline-block';
	}
	searchLogo.onmouseover=function(){
		searchLogo.style.backgroundColor='#FF6700';
		searchLogo.style.color='#FFF';
	}
	searchLogo.onmouseout=function(){
		searchLogo.style.backgroundColor='#FFF';
		searchLogo.style.color='black';
	}
	$('.shop-nav').find(".search").find('input').focus(function(){
		$('.shop-nav').find(".search-list").css({"display":"block"});
	})
	$('.shop-nav').find(".search").find('input').blur(function(){
		$('.shop-nav').find(".search-list").css({"display":"none"});
	})

	$('.shop-nav-ul').find('.shop-nav-ul-li').find('a').mouseover(function(){
		$('.shop-nav-list').addClass('shop-nav-list-active');
		$('.shop-nav-ul').find('.mouse').css({"display":"block"});
		if($(this).attr('num')){
			$(".shop-nav-li[num="+$(this).attr('num')+"]").css({"display":"block"}).siblings().css({"display":"none"});
		}else{
			$('.shop-nav-list').removeClass('shop-nav-list-active');
		}
	});
	$('.shop-nav-ul').mouseleave(function(){
		$('.shop-nav-list').removeClass('shop-nav-list-active');	
	});
	// shop-nav部分开始



	// picture-nav部分开始
	var time=0;
	var bannerIndex=0;
	var bannerNextIndex;
	   $(".picture-nav-bottom").find('li').eq(bannerIndex).addClass('picture-current')
	var bannerAnimate=setInterval(function(){
		bannerIndex=$(".picture-nav-bottom-current").index();
		bannerNextIndex=(bannerIndex+1)>5?0:(bannerIndex+1);
		pictureChange(bannerNextIndex);
	},4000);

	$(".picture-nav-bottom").find('li').click(function(){
		clearInterval(bannerAnimate);
		if(!($(this).index()==$(".picture-nav-bottom-current").index())) {
			$(this).addClass('picture-current').siblings().removeClass('picture-current');
 			pictureChange($(this).index());
		}
	});
	$(".picture-nav-bottom").find('span').eq(1).click(function(){
		if(time==0){
			time=10;
			clearInterval(bannerAnimate);
			bannerIndex=$(".picture-nav-bottom-current").index();
			bannerNextIndex=(bannerIndex+1)>5?0:(bannerIndex+1);
			pictureChange(bannerNextIndex);
			setTimeout(function(){time=0;},600);
		}
	});

	$(".picture-nav-bottom").find('span').eq(0).click(function(){
		if(time==0){
			time=10;
			clearInterval(bannerAnimate);
			bannerIndex=$(".picture-nav-bottom-current").index();
			bannerNextIndex=(bannerIndex-1)<0?5:(bannerIndex-1);
			pictureChange(bannerNextIndex);
			setTimeout(function(){time=0;},600);
		}
	});

	function pictureChange(index){
		$(".picture-nav-bottom-current").fadeOut(500).removeClass('picture-nav-bottom-current');
		setTimeout(function(){
			$(".picture-nav-bottom").find('a').eq(index).addClass('picture-nav-bottom-current').fadeIn(400);
			$(".picture-nav-bottom").find('li').eq(index).addClass('picture-current').siblings().removeClass('picture-current');
		},200);
	}

	$(".picture-nav-aside").find('li').mouseover(function() {
		$(this).find('.content').css({"display":"flex"});
	});
	$(".picture-nav-aside").find('li').mouseout(function() {
		$(this).find('.content').css({"display":"none"});
	});
	// picture-nav部分结束

    // picture-nav-foot部分开始
    $(".picture-nav-foot-option").find('li').mouseover(function() {
    	$(this).find("i").css({"color":"white"})
    })
    $(".picture-nav-foot-option").find('li').mouseout(function() {
    	$(this).find("i").css({"color":"#CFCDCB"})
    })
    // picture-nav-foot部分结束


	// section-star-change a部分开始
	$(".section-star-header").find('a').eq(0).addClass('section-star-header-active');
	var sectionStarAnimate=setInterval(sectionStarChange,8000)	

	function sectionStarChange(){
		if($(".section-star-content").find('ul').hasClass('section-star-content-active')){
			$(".section-star-content").find('ul').removeClass('section-star-content-active');
			$(".section-star-header").find('a').eq(0).addClass('section-star-header-active').siblings().removeClass('section-star-header-active');
		}else{
			$(".section-star-content").find('ul').addClass('section-star-content-active')
			$(".section-star-header").find('a').eq(1).addClass('section-star-header-active').siblings().removeClass('section-star-header-active');
		}
	}

	$(".section-star-header").find('a').eq(1).click(function(){
		if($(".section-star-content").find('ul').hasClass('section-star-content-active')){
			$(".section-star-content").find('ul').removeClass('section-star-content-active');
			$(".section-star-header").find('a').eq(0).addClass('section-star-header-active').siblings().removeClass('section-star-header-active');
		}
	});
	$(".section-star-header").find('a').eq(0).click(function(){
		if(!$(".section-star-content").find('ul').hasClass('section-star-content-active')){
			$(".section-star-content").find('ul').addClass('section-star-content-active')
			$(".section-star-header").find('a').eq(1).addClass('section-star-header-active').siblings().removeClass('section-star-header-active');
		}
	});


	$(".section-star-header").find('a').mouseover(function(){
		clearInterval(sectionStarAnimate);
	});

	$(".section-star-header").find('a').mouseout(function(){
		sectionStarAnimate=setInterval(sectionStarChange,3000);
	});
	// section-star-change 部分结束



	//page-main-section部分开始
	$(".page-main-section").find('.section-content-goods').eq(0).css({"display":"flex"});
	$(".page-main-section").find('.section-header').find('a').eq(0).addClass('current');
	$(".page-main-section").find(".section-header").find('li').mouseover(function(){
		$(".page-main-section").find('.section-content-goods').css({"display":"none"}).eq($(this).index()).css({"display":"flex"})
		$(this).find('a').addClass('current');
		$(this).siblings().find('a').removeClass('current');
	})

	$(".page-main-section").find('.goods').mouseover(function(event) {
		$(this).find('.review-content').css({"margin-top":0});
	});
	$(".page-main-section").find('.goods').mouseout(function(event) {
		$(this).find('.review-content').css({"margin-top":"75px"});
	});
	//page-main-section部分结束




	//page-main-recommend部分开始
	
	

	var pmrUl=$(".page-main-recommend").find('ul');
	var pmrA0=$(".page-main-recommend").find('.change').find('a').eq(0);
	var pmrA1=$(".page-main-recommend").find('.change').find('a').eq(1);
	var pmrPages=$(".page-main-recommend").find('.pages');
	var pmrCurrent;
	pmrUl.eq(0).addClass('current');
	pmrA1.addClass('active');

	pmrA1.click(function(event) {
		if($(this).hasClass('active')){
			pmrCurrent=$(".page-main-recommend").find('.current');
			pmrCurrent.next().addClass('current').siblings().removeClass('current');
			pmrPages.css({"transform":"translate("+(-1240)*(pmrCurrent.index()+1)+"px)"})

			if(!(pmrA0.hasClass('active'))){
				pmrA0.addClass('active');
			}
			if(pmrCurrent.index()==2){
				$(this).removeClass('active')
			}
		}	
	});

	pmrA0.click(function(event) {
		if($(this).hasClass('active')){
			pmrCurrent=$(".page-main-recommend").find('.current');
			pmrCurrent.prev().addClass('current').siblings().removeClass('current');
			pmrPages.css({"transform":"translate("+(-1240)*(pmrCurrent.index()-1)+"px)"})

			if(!(pmrA1.hasClass('active'))){
				pmrA1.addClass('active');
			}
			if(pmrCurrent.index()==1){
				$(this).removeClass('active')
			}
		}
	});
	//page-main-recommend部分结束


	// page-main-content部分开始
	var pmcActive;
	var pmcCurrent;
	$('.page-main-content').find('.item').mouseenter(function(event) {
		$(this).find(".lr").find('span').css({"background-color": "rgba(66,66,66,0.2)"})
	});
	$('.page-main-content').find('.item').mouseleave(function(event) {
		$(this).find(".lr").find('span').css({"background":"white"})
	});
	$('.page-main-content').find(".lr").find('span').mouseover(function(event) {
		$(this).css({"background-color": "rgba(66,66,66,0.6)"})
	});
	$('.page-main-content').find(".lr").find('span').mouseout(function(event) {
		$(this).css({"background-color": "rgba(66,66,66,0.2)"})
	});

	$('.page-main-content').find('.r').click(function(){
		pmcActive=$(this).parents('.item').find('.active');
		pmcCurrent=$(this).parents('.item').find('.item-contents');
		if(pmcActive.next()[0]){
			pmcActive.next().addClass('active').siblings().removeClass('active');
			pmcCurrent.css({'transform':'translate('+(pmcActive.index()+1)*(-296)+'px)'});
		}
	})
	$('.page-main-content').find('.l').click(function(){
		pmcActive=$(this).parents('.item').find('.active');
		pmcCurrent=$(this).parents('.item').find('.item-contents');
		if(pmcActive.prev()[0]){
			pmcActive.prev().addClass('active').siblings().removeClass('active');
			pmcCurrent.css({'transform':'translate('+(pmcActive.index()-1)*(-296)+'px)'});
		}
	})
	$('.page-main-content').find('.change').find('li').click(function(event) {
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parents('.item').find('.item-contents').css({'transform':'translate('+($(this).index())*(-296)+'px)'});
	});
	// page-main-content部分结束





	//page-main-vedio部分开始 
	$(".page-main-video").find('.more').mouseover(function(){
		$(".page-main-video").find('.more').find('a').css({"color":"#FF6700"});
		$(".page-main-video").find('.more').find('i').css({"background-color":"#FF6700"});
	});

	$(".page-main-video").find('.more').mouseout(function(){
		$(".page-main-video").find('.more').find('a').css({"color":"#B0B0B0"});
		$(".page-main-video").find('.more').find('i').css({"background-color":"#B0B0B0"});
	});

	$(".page-main-video").find('.section-content').find('a').mouseover(function(){
		$(this).find('i').css({"background-color":"#FF6B00"})
	})
	$(".page-main-video").find('.section-content').find('a').mouseout(function(){
		$(this).find('i').css({"background-color":"rgba(0,0,0,0)"})
	})
	//page-main-vedio部分结束




	// footer部分开始

	// footer部分开始

		// section-star-change a部分开始
	// section-star-change a部分开始