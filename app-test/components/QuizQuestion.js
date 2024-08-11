import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const QuizQuestion = ({ question, answers, onAnswer }) => {
  return (
		<View style={styles.container}>
			<Text style={styles.question}>{question}</Text>
			{answers.map((answer, index) => (
				<Button key={index} title={answer} onPress={() => onAnswer(answer)} />
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container:{
		padding: 40,
	},
	question: {
		fontSize: 18,
		marginBottom: 10,
	},
});

export default QuizQuestion;