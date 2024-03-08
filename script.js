const homePage = document.querySelector(".homePage");
const startButton = document.querySelector(".startButton");

const gamePage = document.querySelector(".gamePage");
const submitButton = document.querySelector(".submitButton");

const formPage = document.querySelector(".formPage")
const formSubmit = document.querySelector(".formSubmit");

const exitPage = document.querySelector(".exitPage");

startButton.addEventListener("click", ()=>{
    homePage.classList.add("hide");
    gamePage.classList.add("show");
})

  
// Input Validation

document.querySelector('.formSubmit').addEventListener('click', function(event) {
    event.preventDefault();

    var inputs = document.querySelectorAll('.input-fields');
    var filled = true;

    inputs.forEach(function(input) {
        if (input.value.trim() === '') {
            filled = false;
        }
    });

    if (!filled) {
        document.querySelector('.error-message').style.display = 'block';
    } else {
        document.querySelector('.error-message').style.display = 'none';
        // Here you can submit the form or perform other actions
    }
});


submitButton.addEventListener("click", ()=>{
    gamePage.classList.remove("show");
    formPage.classList.add("show");
})

formSubmit.addEventListener("click", ()=>{
    formPage.classList.remove("show");
    exitPage.classList.add("show");
})


// Game Page starts here.....


function _(ele){
    return document.getElementsByClassName(ele);
  }
  
  function $(ele){
    return document.getElementById(ele);
  }
  
  
  function getBoxes(n){
    let outputHTML = "";
    for(let row = 0 ; row < n; row++){
        outputHTML += `<div class="rows">`;
        for(let column = 0 ; column < n; column++){
            outputHTML += `<div class="boxes">
                                <div class = "img" id="imgAt${row}&${column}"> ${row},${column} </div>
                            </div>`;
        }
        outputHTML += `</div>`;
    }
    return outputHTML;
  }
  
  let position;
  function getSurrounding(ele){
    position = [];
    for(let i of ele.id){
        if(!isNaN(i)){
            position.push(i);
        }
    }
    let [row , column] = position;
    let defaultSurrounding = [`imgAt${row-1}&${column}`,`imgAt${Number(row)+1}&${column}`,`imgAt${row}&${column-1}`,`imgAt${row}&${Number(column)+1}`];
    let existSurrounding = [];
    for(let i of defaultSurrounding){
        if(document.getElementById(i)){
            existSurrounding.push(i);
        }
    }
    return existSurrounding;
  }
  
  function enableSubmitButton() {
    document.getElementById('gameSubmit').disabled = false;
}

  let boxesPerRow = 7;
  let onGame = false;
  
  function endGame(){
    if(finalOrder == instantOrder && onGame){
        currentVoid.classList.remove("shrink");
        console.log(finalOrder == instantOrder);
        // enableSubmitButton();
        for(let i of _("img")){
            i.parentElement.classList.remove("active");
            i.removeEventListener("click",swapBoxes);
        }
        console.log("completed");
        _("orginal")[0].classList.add("scaleL");
        setInterval(() => {
            _("orginal")[0].classList.toggle("scaleL");
            _("orginal")[0].classList.toggle("scaleR");
        }, 2000);
        _("sample")[0].classList.add("close");
    }
  }
  
  function swapBoxes(swaplist){
    console.log(swaplist);
    swaplistContent = [swaplist[0].innerHTML , swaplist[1].innerHTML];
    console.log(swaplist);
    let[a,b] = swaplistContent; 
    currentVoid.innerHTML = b;
    swaplist[1].innerHTML = a;
    currentVoid = swaplist[1];
    forUI();
    instantOrder = getOrderOfImages();
    console.log(finalOrder);
    console.log(instantOrder);
    console.log(finalOrder == instantOrder);
    if(finalOrder == instantOrder){
        endGame();
        return
    }
    addListener();
  }
  
  function forUI(){
    for(let i of _("img")){
        i.parentElement.classList.remove("active");
        i.classList.remove("shrink");            
    }
    for(let i of getSurrounding(currentVoid)){
        if($(i) != undefined){
            $(i).parentElement.classList.add("active");
        }
    }
    currentVoid.classList.add("shrink");
  }
  
  function addListener(){
    for(let i of _("img")){
        i.removeEventListener("click",function(){
            swapBoxes([currentVoid,this]);
        });
    }
    for(let i of getSurrounding(currentVoid)){
        if($(i) != undefined){
            $(i).addEventListener("click",function(){
                if(this.classList.contains("active") || this.parentElement.classList.contains("active")){
                    swapBoxes([currentVoid,this]);      
                }
            });
        }
    }
  }
  
  function setImgFrame(src){
    let column = 0 ;
    let row = 0;
    let n = 0 ;
    // _("sample")[0].innerHTML = `<img src="${src}" alt="">`;
    for(let i of _("img")){
        i.innerHTML = `<img src="${src}" alt="">` ;
        i.getElementsByTagName("img")[0].style.height = `${boxesPerRow*100}%`
        i.getElementsByTagName("img")[0].style.top = `-${row*100}%`;
        i.getElementsByTagName("img")[0].style.left = `-${column*100}%`;
        i.getElementsByTagName("img")[0].classList.add(`imgNo${n}`);
        n++;
        column++;
        if (column >= boxesPerRow) {
            row++;
            column = 0;
        }
    }
  }
  
  function getElementsToShuffle(){
    let indices = [];
    let divS = [];
    let a,b,pair;
    for(let i = 0 ; i < boxesPerRow; i++){
        a = [Math.floor((Math.random())*((boxesPerRow))),Math.floor((Math.random())*((boxesPerRow)))];
        b = [Math.floor((Math.random())*((boxesPerRow))),Math.floor((Math.random())*((boxesPerRow)))];
        pair = [a,b];
        indices.push(pair);
    }
    for(let i of indices){
        divS.push([$(`imgAt${i[0][0]}&${i[0][1]}`),$(`imgAt${i[1][0]}&${i[1][1]}`)]);
    }
    return divS;
  }
  
  function shuffle(count){
    for(let i = 0 ; i < count ; i++){
        console.log(currentVoid);
        console.log(getSurrounding(currentVoid));
        let surroundings = getSurrounding(currentVoid);
        let randomIndex = Math.floor(Math.random()*surroundings.length);
        nextVoid = document.getElementById(surroundings[randomIndex]);
        console.log(nextVoid);
        swapBoxes([currentVoid,nextVoid]);
    }
  }
  
  function getOrderOfImages(){
    let order = "";
    for(let i of document.getElementsByTagName("img")){
        order += i.className;
    }
    console.log(order);
    return order;
  }
  
  function getSnow(){
    let ele;
    let elementS = [];
    for(let i = 0 ; i < 5 ; i++){
        ele = document.createElement("div");
        ele.classList.add("snow");
        ele.style.left = `${Math.floor(Math.random()*100)}%`;
        ele.style.height = `${Math.floor(Math.random()*2)}vh`
        _("background")[0].appendChild(ele);
        elementS.push(ele);
    }
    return elementS;
  }
  
  function getSnowRain(elementS){
    setTimeout(() => {
        for(let i of elementS){
            i.classList.add("fall");
        }   
    }, 500);
  }
  
  function setChooseImg(){
    for(let i = 0; i < 3; i++){
        _("chooseImg")[i].innerHTML = `<img src=${imgSrcS[i]}>`;
        _("chooseImg")[i].addEventListener("click",setChooseLevel);
    }
  }
  
  
  function setChooseLevel(){
    setImgSrc(this);
    _("adjustor")[0].classList.add("close");
    setTimeout(() => {
        _("adjustor")[0].classList.toggle("close");
        _("adjustor")[0].innerHTML = `
        <div class="levels">
            <div class="chooseLevel" data-value = "3">Easy</div>
            <div class="chooseLevel" data-value = "4">Medium</div>
            <div class="chooseLevel" data-value = "5">Hard</div>
        </div>`;
        for(let i of _("chooseLevel")){
            i.addEventListener("click",setGame);
        }
    }, 1000);
  }
  
  
  function setImgSrc(imgParent){
    imgSrc = imgParent.getElementsByTagName("img")[0].src;
  }
  
  imgSrc = "Frame 1 191.png";
  let finalOrder;
  let instantOrder;
  let currentVoid;
  boxesPerRow = 4;
  function intiate() {
    _("orginal")[0].innerHTML = getBoxes(boxesPerRow);
    currentVoid = _("img")[(_("img")).length-1];
    forUI();
    addListener();
    setImgFrame(imgSrc);
    finalOrder = getOrderOfImages();
    shuffle(boxesPerRow*boxesPerRow*boxesPerRow);
    instantOrder = getOrderOfImages();
    onGame = true;
    console.log(finalOrder == instantOrder);
  }
  
  intiate();
  



// Appwrite

const { Client, Account, ID, Databases, Query} = Appwrite;

const client = new Client();


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65e992adc15c65a50214');        //change projectID

const account = new Account(client);
const databases = new Databases(client);

// Get references to DOM elements
const formSubmitButton = document.querySelector('.formSubmit');
const errorMessageBox = document.querySelector('.error-message');

formSubmitButton.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('Submit button clicked');

    const name = document.querySelector("#name").value;
    const empId = document.querySelector("#employeeID").value;
    const teamName = document.querySelector("#teamName").value;

    if (name.trim() === '' || empId.trim() === '' || teamName.trim() === '') {
        errorMessageBox.style.display = 'block';
    } else {
        const promise = databases.createDocument(
            '65e992ca0106054bf17c',
            '65ea9e10a4abb0074e58', 
            ID.unique(),
            { 
                Name: name,
                EmployeeID: empId,
                TeamName: teamName    
            }
        );

        promise.then(function (response) {
            console.log(response);
            console.log("Stored in Database!");
            document.querySelector('.error-message').style.display = 'none';
        }).catch(function (error) {
            console.error(error);
        });
    }
});

