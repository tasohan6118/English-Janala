
console.log("index is connected");









// Load function of api-1
function loadLessons() {
  // 1-fetch the data
  fetch("https://openapi.programming-hero.com/api/levels/all")
    // 2-convert promise to json
    .then((res) => res.json())
    // 3-send data to display lessons
    .then((data) => displayLessons(data.data));
}


// load api-3

const loadWordDetails=(id)=>{
    console.log(id);
    const url=`https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayWordDetails(data.data));
};

// display the api-3

const displayWordDetails=(id)=>{
    console.log(id);
    document.getElementById("Word_details").showModal();
    const detailsContainer=document.getElementById("details-container");

    detailsContainer.innerHTML=
    `
    <h1>${id.word}</h1>
    <h3>
    Meaning<br>
    ${id.meaning}
    </h3>

    <h2>
    Example<br>
    ${id.sentence}
    </h2>
    
    <p class="w-[390px] h-[52px]">
    সমার্থক শব্দ গুলো<br>
    <span class="">${id.synonyms}</span>
    </p>

    
    `

}






// Load function of api-2
function loadCard() {
  fetch("https://openapi.programming-hero.com/api/level/1")
    .then((response) => response.json())
    .then((data) => displayCards(data.data));
    // document.getElementById('status').style.display="none";
}

// Category lesson wise
const loadLessonsWise = (level) => {
  const url = `https://openapi.programming-hero.com/api/level/${level}`;
  console.log(url); // Log the API URL
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Display the lesson cards dynamically
      displayCards(data.data);
    })
    .catch((error) => console.error("Error fetching data for lesson level:", error));
};

// Display function of Api-1
function displayLessons(datum) {

const lessonsContainer = document.getElementById("lessons-container");
  for (let dat of datum) {
    console.log(dat);
    const lessonDiv = document.createElement("div");
    lessonDiv.innerHTML = `
      <button onclick="loadLessonsWise(${dat.level_no})" onclick="loadCard()" class="btn btn-sm">
        <i class="fa-solid fa-book-open"></i> Lesson-${dat.level_no}
      </button>
    `;
    lessonsContainer.append(lessonDiv);
  }
}



// Display function of Api-2
const displayCards = (cards) => {
// if (cards.length<1){
//     document.getElementById("card-container").style.display="none";
//     document.getElementById('status').style.display="block";
// }
const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ""; // Clear previous cards before adding new ones
  const limitedCards = cards.slice(0, 6); // Take only the first 6 items
  limitedCards.forEach((cards) => {
    const lessonCard = document.createElement("div");
    lessonCard.innerHTML = `
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">${cards.word}</h2>
          <p>Meaning/Pronunciation</p>
          <h2 class="card-meaning">${cards.meaning} / ${cards.pronunciation}</h2>
        </div>
        <div class="flex justify-between">
      <button onclick="loadWordDetails('${cards.id}')" class="btn btn-sm">
    <i class="fa-solid fa-circle-info"></i>
</button>
   <i class="fa-solid fa-volume-high"></i>
        </div>
      </div>
    `;


//    if(cards.length==0){
//     lessonCard.innerHTML=`<div class="col-span-full text-center">

//  <img class="pl-[650px]" src="./assets/alert-error.png" alt="">
//  <p class="hind-siliguri-light font-regular text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
//  <h1 class="hind-siliguri-light font-Medium text-3xl">নেক্সট Lesson এ যান</h1>
// </div>`;
//     return;
//    }




    cardContainer.append(lessonCard);
  });
};

loadLessons();








