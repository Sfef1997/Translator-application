// Select Elements 
const selectEle = document.querySelectorAll("select")
const translateBtn = document.querySelector(".translate")
const SelectFromText = document.querySelector(".from-text")
const SelectToText = document.querySelector(".from-to")
const exchangBtn = document.querySelector(".exchang")
const icons = document .querySelectorAll(".row i")
const removeBtn = document.querySelector(".remove")

selectEle.forEach((ele,id)=>{
    for(const countrey_code in  countries){
        let selected ;
        // make englich as selected langeug
        if(id == 0 && countrey_code == "en-GB" ){
            selected = "selected";
            // make German as selected langeug
        }else if(id == 1 && countrey_code == "de-DE"){
            selected = "selected";
        }
        // insert the countrey JS file to option list
        let option =`<option value ="${countrey_code}" ${selected}>  ${countries[countrey_code]} </option>`;
        ele.insertAdjacentHTML("beforeend",option)
    }
});
   // Exchang the translate
exchangBtn.addEventListener("click",function(){
    // exchang the Translate
    let tempText = SelectFromText.value;
    SelectFromText.value = SelectToText.value;
    SelectToText.value = tempText ;
    // exchang the selected languge
    let langTemp =selectEle[0].value;
    selectEle[0].value = selectEle[1].value;
    selectEle[1].value = langTemp;
}); 

translateBtn.addEventListener("click",function(){
    // check if selctedfrom not empty 
if(SelectFromText.value != ""){
let text = SelectFromText.value
let translateFrom = selectEle[0].value
let translateTo = selectEle[1].value
//  include translate api 
let apiUrl = 
`https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;
fetch(apiUrl).then(res => res.json()).then(data=>{
    SelectToText.value = data.responseData.translatedText;
    });
}else{
    false
}
});
// make copy function
icons.forEach((icon)=>{
    icon.addEventListener("click",({target})=>{
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
              navigator.clipboard.writeText(SelectFromText.value)
            }else{
                  navigator.clipboard.writeText(SelectToText.value)
         }
        }else{
            // make sound option
            let utterance  ;
             if(target.id == "from"){
              utterance = new SpeechSynthesisUtterance(SelectFromText.value)
              utterance.lang = selectEle[0]
            }else{
                   utterance = new SpeechSynthesisUtterance(SelectToText.value)
                   utterance.lang = selectEle[1]
         }
        //  Active the utterance
         speechSynthesis.speak(utterance)
        }
    })
});
// Remove Button to remove the translate from text Areas
removeBtn.addEventListener("click",()=>{
    SelectFromText.value = ""
    SelectToText.value = ""
});


// function getInfo(){
//     let myRequst = new XMLHttpRequest() ;
// myRequst.onreadystatechange = function(){
//     if(this.readyState === 4 && this.status === 200 ){
//         console.log(this.responseText)
      
//     }
    
      
//  }
//   myRequst.open("Get","countries.json",true);
//         myRequst.send();
// }

// getInfo()

// selectEle.forEach((ele,id)=>{
//     for(const countrey_code in  countries){
//         let selected ;
//         // make englich as selected langeug
//         if(id == 0 && countrey_code == "en-GB" ){
//             selected = "selected";
//             // make German as selected langeug
//         }else if(id == 1 && countrey_code == "de-DE"){
//             selected = "selected";
//         }
//         // insert the countrey JS file to option list
//         let option =`<option value ="${countrey_code}" ${selected}>  ${countries[countrey_code]} </option>`;
//         ele.insertAdjacentHTML("beforeend",option)
//     }
// });