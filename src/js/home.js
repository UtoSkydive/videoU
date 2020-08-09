

  (async function load(){
 
    async function getData(url){
      const response= await fetch(url);
      const data=await response.json();
      if(data.data.movie_count>0){
      return data;
      //aqui se acaba

      }

      //si no aca continua
      // new crea el error y throw lo ejecuta
      throw new Error('No se encontro ningun resultado')
      

    }
    async function getDataUser(url){
      const response = await fetch(url);
      const data= await response.json()
      return data;
      
    }
    const $form =document.getElementById('form');
    const $formhome =document.getElementById('home');
    const $feautureContainer= document.getElementById('featuring');
    function setAttributes($element,attr){
      for (const key in attr){
        $element.setAttribute(key,attr[key]);
        // tambien existe getattribute
        
      }
    }
    const BASE_API='https://yts.mx/api/v2/';
    function featuringTemplate(peli){
      return(
          `<div class="featuring">
          <div class="featuring-image">
            <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
          </div>
          <div class="featuring-content">
            <p class="featuring-title">Pelicula encontrada</p>
            <p class="featuring-album">${peli.title}</p>
          </div>`
      )
    }
    $form.addEventListener('submit',async (event)=>{
      // debugger;
      event.preventDefault();
      $formhome.classList.add('search-active');
      const $loader=document.createElement('img');
      setAttributes($loader,{
        src:'src/images/loader.gif',
        height: 50,
        width:50,
      });
      $feautureContainer.append($loader);
      const data= new FormData($form);
      // queryterm llama pelicula por nombre y limit 1 trae un solo dato
      // const peli= await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
      // destructuring objects
      try{
        const {
          data: {
            movies:pelis
          }
        }= await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
        
        // data.get('name')
        // debugger;
        // const HTMLString=featuringTemplate(peli.data.movies[0]);
        const HTMLString=featuringTemplate(pelis[0]);
  
        $feautureContainer.innerHTML=HTMLString;
      }catch(error){
        // debugger;
        alert(error.message)
        $loader.remove();
        $formhome.classList.remove('search-active');
      }
    

      

    })
    async function cacheExist(category){
      const ListName=`${category}List`
      const cacheList=window.localStorage.getItem(ListName)
      if(cacheList){
        return JSON.parse(cacheList)
      }
      const {data:{movies:data}}=await getData(`${BASE_API}list_movies.json?genre=${category}`)
      window.localStorage.setItem(ListName,JSON.stringify(data));
      
      return data;
    }
    // const dramaList= await getData(`${BASE_API}list_movies.json?genre=drama`)
    // const {data:{movies:dramaList}}= await getData(`${BASE_API}list_movies.json?genre=drama`)
    const dramaList= await cacheExist('drama')
    
    // desestructurando el acction list
    // window.localStorage.setItem('dramaList',JSON.stringify(dramaList));
    // const {data:{movies:actionList}}= await getData(`${BASE_API}list_movies.json?genre=action`)
    const actionList= await cacheExist('action')
    // window.localStorage.setItem('actionList',JSON.stringify(actionList));
    
    // const {data:{movies:animationList}}= await getData(`${BASE_API}list_movies.json?genre=animation`)
    const animationList=  await cacheExist('animation')
    
    // window.localStorage.setItem('animationList',JSON.stringify(animationList));
    
    console.log('action',actionList,'terror',dramaList,'animation',animationList)
    // console.log('actionlist',actionList)
    //.home{color:red}stringify
    // debugger

  //  friends
    function friendsPlayListTemplate(user) {

      const userName = `${user.name.first} ${user.name.last}`
  
      return (`
        <li class="playlistFriends-item" >
          <a href="#">
            <img src="${user.picture.thumbnail}" alt="${user.name.first} foto" />
            <span>
              ${userName}
            </span>
          </a>
        </li>
    `)
    }
    function renderFriendsList(list, $container){

      list.forEach((user) => {
        const HTMLString = friendsPlayListTemplate(user)
        const userElement = createTemplate(HTMLString)
        $container.append(userElement)
      })
  
    }
    const {results:friendsList}= await getDataUser('https://randomuser.me/api/?results=10');
    console.log(friendsList)
    const $playListFriends = document.getElementById('playlistFriends')
    renderFriendsList(friendsList, $playListFriends)
// fin

    //LISTA PELIS A LA IZQ
    function playListItemTemplate(movie) {
      return `
        <li class="myPlaylist-item">
          <a href="#">
            <span>
              ${movie.title}
            </span>
          </a>
        </li>
      `
    }
    function renderPlayList(list, $container){

      list.forEach((movie) => {
        const HTMLString = playListItemTemplate(movie)
        const movieElement = createTemplate(HTMLString)
        $container.append(movieElement)
      })
  
    }
    const {data: {movies: playList}} = await getData(`${BASE_API}list_movies.json?limit=10`)
    const $playListContainer = document.getElementById('myPlayList')
    renderPlayList(playList, $playListContainer)

    // fin
    
    function videoItem(movie,category){
      return(

      `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category=${category}>
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
    function createTemplate(HTMLString){
      const html=document.implementation.createHTMLDocument();
      html.body.innerHTML=HTMLString;
      return html.body.children[0];
    }
    function addEventClick($element){
      $element.addEventListener('click',function(){
        // alert('click');
        showModal($element);
      })
    }
    function renderMovieList(list,container,category){
      // actionList.data.movies.
      container.children[0].remove();
      list.forEach((movie)=>{
        
        const HTMLString= videoItem(movie,category);
        const movieElement=createTemplate(HTMLString)
        container.append(movieElement);
        const img=movieElement.querySelector('img')
        img.addEventListener('load',(event)=>{

          // img.classList.add('fadeIn')
          event.srcElement.classList.add('fadeIn')

        })
        addEventClick(movieElement)
        
      })
    }
    const $actionContainer= document.querySelector('#action');
    renderMovieList(actionList, $actionContainer, 'action')

    const $dramaContainer= document.getElementById('drama');
    renderMovieList(dramaList, $dramaContainer,'drama')

    // const $dramaContainer= document.getElementById('drama');
    // renderMovieList(dramaList.data.movies, $dramaContainer,'drama')

    const $animacionContainer= document.getElementById('animation');
    renderMovieList(animationList, $animacionContainer,'animation')

    
    
   //selectores modal para detalles peli
    const $modal= document.getElementById('modal');
    const $overlay= document.getElementById('overlay');
    const $hideModal= document.getElementById('hide-modal');
    const modalTitle=$modal.querySelector('h1');
    const modalimage=$modal.querySelector('img');
    const modalDescription=$modal.querySelector('p');
    function findById(list,id){
      return list.find(movie=>movie.id === parseInt(id,10));
    
    }
    function findMovie(id,category){
      
        // debugger
        switch(category){
          case 'action':{
            return findById(actionList,id)
          }
          
          case 'drama':{
            return findById(dramaList,id)
          }
          default:{
            return findById(animationList,id)
          }
        }
        
      
    }
    
    function showModal($element){
      $overlay.classList.add('active');
      $modal.style.animation='modalIn .8s forwards';
      const id=$element.dataset.id;
      const category= $element.dataset.category;
      const data=findMovie(id,category);
      // debugger
       modalTitle.textContent=data.title
       modalimage.setAttribute('src',data.medium_cover_image)
       modalDescription.textContent=data.description_full;
    }
    function hideModal(){
      $overlay.classList.remove('active');
      $modal.style.animation='modalOut .8s forwards';
    }
    $hideModal.addEventListener('click',hideModal);

  })();



  

