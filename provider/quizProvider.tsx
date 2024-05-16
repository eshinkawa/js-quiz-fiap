import React, { createContext, useState } from 'react';

// const questions = [];

export const QuizContext = createContext({
  currentQuestion: -1,
  setCurrentQuestion: () => {},
  score: 0,
  setScore: () => {},
  // userAnswers: [],
  handleAnswer: () => {},
});

export const QuizProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [score, setScore] = useState(0);

  const handleAnswer = async (option: string) => {
    //se a opção for igual a resposta
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    // navegação para a próxima pergunta
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
    // se for a última pergunta, navega para a tela de detalhes e salva o score no firestore
    else {
      try {
        //FIREBASE - FIRESTORE
        await addDoc(collection(database, 'scores'), {
          nickname,
          score,
          timestamp: new Date(),
        });
        navigation.navigate('Details', { score });
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

  return (
    <QuizContext.Provider
      value={{ currentQuestion, setCurrentQuestion, score, setScore, handleAnswer }}>
      {children}
    </QuizContext.Provider>
  );
};
