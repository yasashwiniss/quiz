
const questionText = document.querySelector(".question-text");
const options = document.querySelector(".optn-container");
const homeBox = document.querySelector(".home");
const quizBox = document.querySelector(".quiz");
const resultBox = document.querySelector(".result");

let questionCounter = 0;
let currentQuestion;
let availableQuestions= [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

function setAvailableQuestions(){
 const totalQuestion = quiz.length;
 for(let i=0; i<totalQuestion; i++)
    { availableQuestions.push(quiz[i])
    }
}
function getNewQuestion(){
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    const index1 = availableQuestions.indexOf(questionIndex);
    //console.log(index1)
    //console.log(questionIndex)
    availableQuestions.splice(index1,1);
    const optionlen = currentQuestion.options.length;
    for(let i=0; i<optionlen; i++){
        availableOptions.push(i)
    }
    options.innerHTML= '';
    let animationDelay = 0.15;
    for(let i=0; i<optionlen; i++){
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)]
        const index2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2,1);
       // console.log(optionIndex)
        //console.log(availableOptions)
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        options.appendChild(option)
        option.setAttribute("onclick","getresult(this)");
    }
    
    questionCounter++
}
function getresult(element){
   const id = parseInt(element.id);
   if(id === currentQuestion.answer){
       element.classList.add("correct");
       correctAnswers++;
   }
   else{
       element.classList.add("wrong");
       const optionLen = options.children.length;
       for(let i=0; i<optionLen; i++){
           if(parseInt(options.children[i].id) === currentQuestion.answer){
        options.children[i].classList.add("correct");}
    }
   }
   // console.log(element.innerHTML)
      attempt++;
      unclickableOptions();
}

function unclickableOptions(){
    const optionLen = options.children.length;
    for(let i=0; i<optionLen; i++){
        options.children[i].classList.add("already-answered");
    }
}
function next(){
    if(questionCounter === quiz.length){
        console.log("quiz over");
        quizOver();

    }
    else{
        getNewQuestion();
    }
}
function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
}
function quizResult(){
    resultBox.querySelector(".tot-attemt").innerHTML = attempt;
    resultBox.querySelector(".tot-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".tot-wrong").innerHTML = attempt - correctAnswers;
    resultBox.querySelector(".tot-score").innerHTML = correctAnswers +"/"+ quiz.length;
    
}
function resetquiz(){
     questionCounter = 0;
     correctAnswers = 0;
     attempt = 0;
}
function tryagainquiz(){
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetquiz();
    startQuiz();

}
function gotohome(){
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetquiz();
}
 function startQuiz(){
     homeBox.classList.add("hide");
     quizBox.classList.remove("hide");
    setAvailableQuestions();
    getNewQuestion();
}
