$(document).ready(function(){
$('.control-game span').click(function(){
    $(this).fadeOut(600);
    var yourName = prompt("PLz enter your name :)");
    if (yourName==null  || yourName==""){
        $('.name span:first').text("Unknown");
        }else{
            $('.name span:first').html(yourName);
        }
        $('.control-game').remove();
        // music start
        document.getElementById('start').play()
       // start timer
       strartTimer()
       

})

var timer=document.querySelector('#time');
var counterMin=1;
var counterSec=59;
 // timer
 function strartTimer(){
  clear=setInterval(function(){

     counterSec--;
    if(counterSec>=10){
        timer.textContent= ("0"+counterMin+":"+counterSec)
    }
    else if(counterSec<10 && counterSec>0){
        timer.textContent=("0"+counterMin+":0"+counterSec)
    }
    else if(counterSec==0 && counterMin>0){
        counterMin--;
        counterSec=59;
        counterSec--;
        timer.textContent= ("0"+counterMin+":"+counterSec)
    }
     if(counterMin<1 && counterSec<6){
        document.getElementById('finalSec').play();
          timer.style.color='red';
          if(counterSec<1){
            clearInterval(clear); 
            document.getElementById('finalSec').pause()
            timer.textContent= ("00:00")
            timer.style.color='black';
          }
      }
     
   },1000)

}

let duration=700;
let blockContainer=document.querySelector('.game-container');
let blocks=Array.from(blockContainer.children)

let orderRange=[...Array(blocks.length).keys()]

// console.log(orderRange)

shuffle(orderRange); //to rearrange array

blocks.forEach((block,index)=>{
    block.style.order=orderRange[index];
    // add event click
   $(block).click(function(){
       flip(block);
   })
})
//function flip
function flip(selectedItem){
    $(selectedItem).addClass('is-hover');

    let allFlipped=blocks.filter(flip=>flip.classList.contains('is-hover'));

    if(allFlipped.length==2){
      stopClick();
      // check if the two items matched or not
      matched(allFlipped[0],allFlipped[1]);
    }
}
// function to stop clicking
function stopClick(){
    blockContainer.classList.add('stop-click');
    setTimeout(()=>{
        blockContainer.classList.remove('stop-click');
    },duration)
}
//check matched blocks
function matched(first,second){
let tries=document.querySelector('.try span');
if(first.dataset.emojies === second.dataset.emojies ){
    first.classList.remove('is-hover');
    second.classList.remove('is-hover');

    first.classList.add('match');
    second.classList.add('match');

    document.getElementById('true').play();
}else{
    tries.innerHTML=parseInt(tries.innerHTML)+1;
    document.getElementById('false').play();
    setTimeout(()=>{
        first.classList.remove('is-hover');
        second.classList.remove('is-hover');
    },duration)
   
    
}
}
//function to get random order 
function shuffle(array){
    let current=array.length;
    let temp,random;
    while(current>0){
        random=Math.floor(Math.random()*current);
        current--;
        temp=array[current];//last element
        array[current]=array[random];//swapping
        array[random]=temp;
    }
    return array;
}







});
