import { addDoc, collection } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { QuizContext } from 'provider/quizProvider';
import React, { useContext, useState } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { database } from 'utils/firebase';

const questions = [
  //objeto: conjunto chave-valor
  {
    question: 'O que é JavaScript?', // string
    options: [
      'Uma linguagem de marcação',
      'Uma linguagem de programação',
      'Um banco de dados',
      'Um framework',
    ], //array
    answer: 'Uma linguagem de programação', //string
  },
  {
    question: 'Qual método é usado para adicionar um elemento ao final de um array em JavaScript?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    answer: 'push()',
  },
  {
    question: 'Como você declara uma variável constante em JavaScript?',
    options: ['var', 'let', 'const', 'nenhuma das opções'],
    answer: 'const',
  },
  {
    question:
      'Qual objeto em JavaScript pode ser usado para garantir a execução de código após um intervalo específico?',
    options: ['setTimeout', 'setInterval', 'timeOut', 'interval'],
    answer: 'setTimeout',
  },
  {
    question: 'Em JavaScript, qual dessas opções altera o contexto do "this" dentro de uma função?',
    options: ['call()', 'apply()', 'Ambas as opções', 'Nenhuma das opções'],
    answer: 'Ambas as opções',
  },
  {
    question: 'Qual é a função dos callbacks em JavaScript?',
    options: [
      'Executar uma função remotamente',
      'Interromper a execução de uma função',
      'Executar uma função após a conclusão de outra',
      'Nenhuma das opções',
    ],
    answer: 'Executar uma função após a conclusão de outra',
  },
  {
    question: 'Qual declaração é verdadeira sobre o JavaScript moderno?',
    options: [
      'Não suporta programação assíncrona',
      'Suporta funções de primeira classe',
      'Não permite funções anônimas',
      'Não suporta programação orientada a objetos',
    ],
    answer: 'Suporta funções de primeira classe',
  },
  {
    question: 'Como é chamado o JSON no contexto de JavaScript?',
    options: [
      'Java Standard Output Network',
      'JavaScript Object Notation',
      'Java Source Open Network',
      'JavaScript Object Network',
    ],
    answer: 'JavaScript Object Notation',
  },
  {
    question: 'Qual método é usado para transformar JSON em um objeto JavaScript?',
    options: ['JSON.toObject()', 'JSON.parse()', 'JSON.stringify()', 'JSON.fromObject()'],
    answer: 'JSON.parse()',
  },
  {
    question: 'Qual dessas palavras-chave é usada para capturar exceções em JavaScript?',
    options: ['try', 'catch', 'error', 'finally'],
    answer: 'catch',
  },
];

function Overview() {
  const { currentQuestion, setCurrentQuestion, score, setScore, handleAnswer } =
    useContext(QuizContext);
  const navigation = useNavigation();
  const [nickname, setNickname] = useState('');

  return (
    <SafeAreaView style={{ margin: 32 }}>
      {currentQuestion > -1 ? (
        <>
          <Text style={{ marginBottom: 16 }}>{questions[currentQuestion].question}</Text>
          {questions[currentQuestion].options.map((option, index) => (
            <View key={index} style={{ marginBottom: 14 }}>
              <Button key={index} title={option} onPress={() => handleAnswer(option)} />
            </View>
          ))}
        </>
      ) : (
        <>
          <Text style={{ marginBottom: 16 }}>Da ultima vez você acertou {score} questões!</Text>
          <Text style={{ marginBottom: 16 }}>Digite seu nickname:</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 16,
              padding: 10,
            }}
            onChangeText={setNickname}
            value={nickname}
          />
          <Button
            title="INICIAR QUIZ"
            onPress={() => {
              setScore(0);
              setCurrentQuestion(0);
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
}

export default Overview;
