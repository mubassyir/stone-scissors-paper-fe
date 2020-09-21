const request = new XMLHttpRequest(); 
// DOM IMG URL PLAYER
let bgMain = document.getElementById('page1');
let bgTheGames = document.getElementById('page2');
let bgFeatures = document.getElementById('page3');
let bgRequirements = document.getElementById('page4')
let bgTopScores = document.getElementById('page5');
let bgBlog = document.getElementById('page6');
let carouselParent = document.getElementById('parent-carousel');
let carouselIndicator = document.getElementById('cr-indicators');
let topScores = document.getElementsByClassName('rounded-circle');


try{
    request.open('GET','http://127.0.0.1:3000/api', true);
    request.onload = function(){
        let arrayImageUrl = [];
        let arrayTopScores = [];
        let data = JSON.parse(this.response)
        
        data.main_page.forEach((image) => arrayImageUrl.push(image.url));
        for(let i=0; i<arrayImageUrl.length; i++){
          let indicator = document.createElement('li');
          let carouselItem = document.createElement('div');
          let img = document.createElement('img');
            img.setAttribute('class','d-block w-100 ');
            img.setAttribute('src',arrayImageUrl[i]);
            img.setAttribute('alt',`slide index ${i}`)
            indicator.setAttribute('data-target','#carouselExampleIndicators');
          if(i===0){
            indicator.setAttribute('class','active');
            carouselItem.setAttribute('class','carousel-item active');
          } else{
            carouselItem.setAttribute('class','carousel-item');
          }
          carouselIndicator.appendChild(indicator);
          carouselItem.appendChild(img);
          carouselParent.appendChild(carouselItem);
        }
        bgMain.style.backgroundImage = `url(${arrayImageUrl[0]})`;
        bgTheGames.style.backgroundImage = `url(${arrayImageUrl[1]})`;
        bgRequirements.style.backgroundImage = `url(${arrayImageUrl[2]})`;
        bgFeatures.style.backgroundImage = `url(${arrayImageUrl[3]})`;
        bgTopScores.style.backgroundImage = `url(${arrayImageUrl[4]})`;
        bgBlog.style.backgroundImage = `url(${arrayImageUrl[4]})`;
        
        data.top_scores.forEach((image)=>{
          arrayTopScores.push(image.url);
        })

        for(let i=0; i<arrayTopScores.length; i++){
          topScores[i].setAttribute('src',arrayTopScores[i]);  
        } 
    }
    request.send();
} catch(err) {
    console.log(err.message);
}