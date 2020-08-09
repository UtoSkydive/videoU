console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

//promesas
const getuserAll=new Promise(function(todoBien,todoMal){
  //lamma a un api
  //setInterval //funcion de js cada cierto time
  setTimeout(function(){
    //luego d 3 seg
    // todoMal('se acabo el tiempo');
    todoBien('exito');

  },5000)// una sola vez
});

const getuser=new Promise(function(todoBien,todoMal){
  //lamma a un api
  //setInterval //funcion de js cada cierto time
  setTimeout(function(){
    //luego d 3 seg
    // todoMal('se acabo el tiempo');
    todoBien('exito3');

  },3000)// una sola vez
});

getuser
  .then(function (){
    console.log('todo esta bien')
  })
  .catch(function(msg){
    console.log(msg)
  })
//ejecutar vaias promessas
// Promise.all([
//   getuser,
//   getuserAll,
// ]).then(function(msg){
//   console.log(msg)
// })
// .catch(function(msg){
//   console.log(msg)
// })
//carrerade primises solo entra a el then  se resuelva primero
Promise.race([
  getuser,
  getuserAll,
]).then(function(msg){
  console.log(msg)
})
.catch(function(msg){
  console.log(msg)
});


//ajax

// $.ajax('https://randomuser.me/api/',{
//   method:'GET',
//   success:function(data){
//     console.log(data)
//   },
//   error:function(err){
//     console.log(err)
//   }
// })

// XMLHttpRequest

// fetch('https://randomuser.me/api/')
//   .then(function(response){
//     // console.log(response)
//     return response.json()
//   })
//   .then(function (user){
//     console.log('user', user.results[0].name.first)
//   })
//   .catch(function(){
//     console.log('algo fallo')
//   });

  // funciones async

  (async function load(){
    // await 
    //action
    //terror
    //animacion
    async function getData(url){
      const response= await fetch(url);
      const data=await response.json();
      return data;
    }
    const TeroroList= await getData('https://yts.mx/api/v2/list_movies.json?genre=Thriller')
    const actionList= await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
    const animationList= await getData('https://yts.mx/api/v2/list_movies.json?genre=animation')
    console.log('action',actionList,'terror',TeroroList,'animation',animationList)
    // console.log('actionlist',actionList)
    //.home{color:red}
    // debugger
    function videoItem(movie){
      return(

      `<div class="primaryPlaylistItem">
          <div class="primaryPlaylistItem-image">
          <img src="${movie.medium_cover_image}">
          </div>
          <h4 class="primaryPlaylistItem-title">
          ${movie.title}
          </h4>
      </div>`
      )
    }
    // console.log(videoItem('src/images/covers/bitcoin.jpg','bitcoin'))
    const $actionContainer= document.querySelector('#action');
    
    actionList.data.movies.forEach((movie)=>{
      // debugger;
      const HTMLString= videoItem(movie);
      const html=document.implementation.createHTMLDocument();
      html.body.innerHTML=HTMLString;
      // debugger
      $actionContainer.append(html.body.children[0]);
      // console.log(HTMLstring)
    })
    const $dramaContainer= document.getElementById('#drama');
    const $animacionContainer= document.getElementById('#animation');
    const $feautureContainer= document.getElementById('#featuring');
    const $form =document.getElementById('#form');
    const $formhome =document.getElementById('#home');




    // const $home=$('.home .list #item');
    const $home= document.getElementById('modal');
    const $overlay= document.getElementById('overlay');
    const $hideModal= document.getElementById('hide-modal');
    // document.querySelector('#modal img')
    const modalTitle=$home.querySelector('h1');
    const modalimage=$home.querySelector('img');
    const modalDescription=$home.querySelector('p');
    
    

  })();


  // function getpoke(){
  //   fetch('https://pokeapi.co/api/v2/pokemon/1')
  //   .then(function (response){
  //     if(response.ok){
  //       return response.json()

  //     }else{
  //       throw 'data no cargada'
  //     }
  //   }).then(function(data){
  //     console.log(data)
  //   }).catch(function(err){
  //     console.log(err)
  //   })
  // };

  // getpoke();
  

