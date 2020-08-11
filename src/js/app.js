window.addEventListener('load',function(){
    let listaMovies=document.querySelectorAll('.carousel__lista');
    listaMovies.forEach(element=>{
        new Glider(element,{
            slidesToShow: 1,
              slidesToScroll: 1,
              draggable: true,
              dots: '.carousel__indicadores',
              arrows: {
                prev: '.carousel__anterior',
                next: '.carousel__siguiente'
            },
            responsive: [
                {
                  // screens greater than >= 775px
                  breakpoint: 450,
                  settings: {
                    // Set to `auto` and provide item width to adjust to viewport
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    itemWidth: 150,
                    duration: 0.25
                  }
                },{
                  // screens greater than >= 1024px
                  breakpoint: 800,
                  settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                    itemWidth: 150,
                    duration: 0.25
                  }
                }
              ]
        });
    })
	
});