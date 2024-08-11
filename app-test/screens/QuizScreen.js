import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { questions } from '../data';
import QuizQuestion from '../components/QuizQuestion';
import { saveScore } from '../leaderboard';

const shuffleArray = (array) => {
	let currentIndex = array.length, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
	return array;
};

const QuizScreen = ({ navigation }) => {
	const [shuffledQuestions, setShuffledQuestions] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [score, setScore] = useState(0);

	useEffect(() => {
		reset();
	}, []);

	const reset = () => {
		const randomizedQuestions = shuffleArray([...questions]);
		setScore(0);
		setCurrentQuestionIndex(0);
		setShuffledQuestions(randomizedQuestions);
	};

	const handleAnswer = async (answer) => {
		let tmpScore = score;
		const correctAnswer = shuffledQuestions[currentQuestionIndex].correctAnswer;
		if (answer === correctAnswer) {
			tmpScore += 1;
			setScore(score + 1);
		}
		
		if (currentQuestionIndex < shuffledQuestions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			// Quiz is finished
			await saveScore('ทดสอบครั้งที่', tmpScore);

			reset();

			navigation.navigate('Leaderboard');
		}
	};

	if (shuffledQuestions.length === 0) {
		return <Text>Loading...</Text>;
	}

	const currentQuestion = shuffledQuestions[currentQuestionIndex];

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.score}>คะแนนที่ได้: {score} คะแนน</Text>
			<QuizQuestion
				question={currentQuestion.question}
				answers={shuffleArray(currentQuestion.answer)}
				onAnswer={handleAnswer}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	score: {
		fontSize: 18,
		marginBottom: 20
	},
});

export default QuizScreen;