import { collection, onSnapshot, query } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { orderBy, limit } from 'firebase/firestore';
import { QuizContext } from 'provider/quizProvider';
import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, Text, View, StyleSheet, Button } from 'react-native';
import { database } from 'utils/firebase';

function Details() {
  const [scores, setScores] = useState([]);
  const navigation = useNavigation();
  const { setCurrentQuestion } = useContext(QuizContext);

  useEffect(() => {
    const scoresCol = query(collection(database, 'scores'), orderBy('score', 'desc'));
    const unsubscribe = onSnapshot(scoresCol, (querySnapshot) => {
      const scoresList = [];
      querySnapshot.forEach((doc, index) => {
        scoresList.push({ ...doc.data(), key: doc.id, rank: index + 1 });
      });
      setScores(scoresList);
    });

    return () => unsubscribe(); // Limpeza do listener ao desmontar o componente
  }, []);

  return (
    <ScrollView style={styles.container}>
      {scores.map((score, index) => (
        <View key={score.key} style={styles.scoreEntry}>
          <Text style={styles.text}>
            ({index + 1}) {score.nickname} Pontuação: {score.score}
          </Text>
        </View>
      ))}

      <Button
        title="REINICIAR QUIZ"
        onPress={() => {
          setCurrentQuestion(-1); //reseta o quiz
          navigation.navigate('Overview');
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 32,
  },
  scoreEntry: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
});

export default Details;
