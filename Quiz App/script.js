let currentQuestion = 0;
let currentScore = 0;

const quizData = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    answer: "Cascading Style Sheets"
  }
];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const answerEl = document.getElementById("answers");


   const submitBtn = document.getElementById("submit");

        submitBtn.addEventListener("click", (idx)=> {

            const selectedOption = document.querySelector("input[name='quiz']:checked");

            if(selectedOption){
                const answerText = selectedOption.nextElementSibling.textContent;
                if(answerText === quizData[currentQuestion].answer){
                currentScore+=1;
                answerEl.innerHTML="";
                answerEl.textContent = `Correct Answer!!! Your score is ${currentScore};`
                } else {
                currentScore = Math.max(0, currentScore - 1);
                 answerEl.textContent = `Wrong Answer..... Your score is ${currentScore};`
            }
            } 
        })




function loadQuiz() {
    answerEl.textContent = "";
    const q = quizData[currentQuestion];
    questionEl.innerText = q.question;

    optionsEl.innerHTML = "";
    q.options.forEach((option,idx)=>{
        optionsEl.innerHTML += `
        
            <li class="option" style="list-style-type:none">
                <input type="radio" id="option-${idx+1}" name="quiz">
                <label for="option-${idx+1}">${option}</label>
            </li>
        
        `;
    })
}

const backBtn = document.getElementById("backward");

backBtn.addEventListener("click", ()=> {
    if(currentQuestion!==0){
        currentQuestion-=1;
    }

    loadQuiz();
})

const fowardBtn = document.getElementById("forward");

fowardBtn.addEventListener("click", ()=> {
    if(currentQuestion < quizData.length - 1){
        currentQuestion+=1;
    }

    console.log(currentQuestion);

    loadQuiz();
})




loadQuiz();