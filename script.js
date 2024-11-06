const selectTag = document.querySelectorAll("select");
const translateBtn =document.querySelector("#btn");
const fromText =document.querySelector("#fromText");
const toText =document.querySelector("#toText");
const icons =document.querySelectorAll("img");
 
//yaha par selectTag ke sath for each iss liye lagaya taki sare country code aaye select area mai
selectTag.forEach((tag,id)=>{
    
    for (const countriesCode in countries) {
        let selected;
        if(id==0 && countriesCode=="en-GB"){
            selected="selected";
        }else if(id==1 && countriesCode=="hi-IN"){
            selected="selected";

        }
        //    for many options
        let option = `<option value="${countriesCode}" ${selected}>${countries[countriesCode]}</option>`;
        tag.insertAdjacentHTML("beforeend",option);  //beforeend iss liye use kara hai taki hum select section ke option ki value dal sake
        }
});

translateBtn.addEventListener(("click"),()=>{
    let Text=fromText.value,
    translateFrom =selectTag[0].value,
    translateTo =selectTag[1].value 

    // use of api for translate the text
    const apiURL=`https://api.mymemory.translated.net/get?q=${Text}!&langpair=${translateFrom}|${translateTo}`

    // now fetching the api

    fetch(apiURL).then(res => res.json()).then(data=>{  //.then ka use hai response ko lena then json =means jis hissab se humko content chaiye  api se to json uss format mai change kar deta hai
        toText.value = data.responseData.translatedText

    });
});


icons.forEach(icon =>{
    icon.addEventListener( "click" , ({target}) => {
        if(target.classList.contains("copy") ){
            if(target.id == "from"){
               navigator.clipboard.writeText(fromText.value)// navigator.clipboard  humhare kisi bhi text ko copy karne ke liye
            }
            else{
                navigator.clipboard.writeText(toText.value)
            }
        }
        else{
            let utterance;
            if(target.id == "from"){
               utterance = new SpeechSynthesisUtterance(fromText.value)//SpeechSynthesisUtterance means ye ek function hai jo fromText msi jo likha hai uss ko bolega
               utterance.lang = selectTag[0].value;
    
            }else{
                utterance = new SpeechSynthesisUtterance(toText.value)
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
    });
