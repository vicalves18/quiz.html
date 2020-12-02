const startButton = document.getElementById('start-btn')
  const nextButton = document.getElementById('next-btn')
  const questionContainerElement = document.getElementById('question-container')
  const questionElement = document.getElementById('question')
  const answerButtonsElement = document.getElementById('answer-buttons')
  const scoreText=document.getElementById('score')
  
  let shuffledQuestions, currentQuestionIndex
  let acepptingAnswers=true
  let score=0
  let availableQuestions=[]

  const SCORE_POINTS = 1
  const MAX_QUESTIONS=5
  
  const highScores=JSON.parse(localStorage.getItem('highScores')) || [] ;
  const highScoresList=document.querySelector('#highScoresList')

    
  startButton.addEventListener('click', startGame)
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
  })
  
  function startGame() {
    score=0
    scoreText.innerText=score
    startButton.classList.add('hide')
    availableQuestions=[...questions]
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
  }
  
  setNextQuestion=()=>{
    if(availableQuestions.lenght===0 || currentQuestionIndex>MAX_QUESTIONS){
      localStorage.setItem('highScores',score)

    }
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
  }
  
  function showQuestion(question) {
    questionElement.innerText = question.question
    acepptingAnswers=true
    question.answers.forEach(answer => {
      const button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn')
     if(answer.correct){
       button.dataset.correct=answer.correct
     }
      
      button.addEventListener('click', selectAnswer)
      answerButtonsElement.appendChild(button)
    })
  }
  
  function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')

      acepptingAnswers=false
      const selectedAnswer=selectedButton.dataset['number']
      let classToApply=selectedAnswer==currentQuestionIndex.answer ? 'correct.true' : 'correct.false'
      if(classToApply==='correct.true'){
        incrementScore(SCORE_POINTS)
      }  
    } else {
      startButton.innerText = 'Restart'
      startButton.classList.remove('hide')
      incrementScore(SCORE_POINTS)
    } 

    
  }


  function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
      element.classList.add('correct')
      
    } else {
      element.classList.add('wrong')
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
  }

  incrementScore=num=>{
    score+=num
    scoreText.innerText=score
    
  }


const questions = [
  {
    question: 'Cães podem contaminar seus donos?',
    answers:[
      {text:'Verdadeiro', correct:false},
      {text:'Falso', correct:true}
    ]
    
  },
  {
    question: 'O corona virus é transmitido através de:',
    answers: [
      { text: 'Aperto de mão', correct: true  },
      { text: 'Um simples aceno', correct:false},
      { text: 'Mensagem no whatszap', correct: false },
      { text: 'So de olhar', correct: false}
    ]
    
  },
  {
    question: 'Qual alcool é mais eficaz para o combate ao virus?',
    answers: [
      { text: 'Alcool 40%', correct: false },
      { text: 'Alcool 70%', correct: true },
      { text: 'Alcool 30%', correct: false },
      { text: 'Alcool pra quê?!', correct: false }
    ]
    
  },
  { 
    question: 'Qual desse é um sintoma grave do corona virus?',
    answers: [
      { text: 'Coceira', correct: false },
      { text: 'Dores fortes no peito', correct: true },
      { text: 'Desidratação', correct: false },
      { text: 'Manchas no corpo', correct: false },
    ]
  
  },
  { 
    question: 'Por quê é necessário o uso de máscara?',
    answers: [
      { text: 'Pra nada', correct: false },
      { text: 'Para tampar o rosto', correct: false },
      { text: 'Para conter a disseminação do vírus', correct: true },
      { text: 'Nenhuma das opções', correct: false },
    ]
  
  },
  { 
    question: 'Qual parte do corpo o vírus mais afeta?',
    answers: [
      { text: 'Cérebro', correct: false },
      { text: 'Rins', correct: false },
      { text: 'Pulmão', correct: true },
      { text: 'Fígado', correct: false },
    ]
  },
  { 
    question: 'Quem está mais vulneravel ao covid-19?',
    answers: [
      { text: 'Crianças', correct: false },
      { text: 'Adultos', correct: false },
      { text: 'Idosos', correct: true },
      { text: 'Jovens', correct: false },
    ]
  },
  { 
    question: 'O covid-19 é transmitido pelo ar?',
    answers: [
      { text: 'Verdadeiro', correct: false },
      { text: 'Falso', correct: true },
      
    ]
  },
  { 
    question: 'Onde foi descoberto o novo corona vírus?',
    answers: [
      { text: 'Itália', correct: false },
      { text: 'EUA', correct: false },
      { text: 'Brasil', correct: false },
      { text: 'China', correct: true },
      
    ]
  },
  { 
    question: 'Taquicardia(aumento dos batimentos cardíacos) é um sintoma do covid-19?',
    answers: [
      { text: 'Verdadeiro', correct: true },
      { text: 'Falso', correct: false },
      
    ]
  },


]
