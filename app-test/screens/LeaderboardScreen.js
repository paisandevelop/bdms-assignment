import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getLeaderboard } from '../leaderboard';

const LeaderboardScreen = () => {
	const [leaderboard, setLeaderboard] = useState([]);

	useEffect(() => {
		const fetchLeaderboard = async () => {
			const data = await getLeaderboard();
			setLeaderboard(data/*.sort((a, b) => b.score - a.score)*/);
		};

		fetchLeaderboard();
	}, []);

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>สรุปผลคะแนน</Text>
			{leaderboard.length === 0 ? (
				<Text> No scores available.</Text>
			) : (
				leaderboard.map((entry, index) => (
					<Text key={index} style={styles.entry}>
						{entry.title} {index + 1}: {entry.score}
					</Text>
				))
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
	},
	entry: {
		fontSize: 18,
		marginVertical: 5,
	},
});

export default LeaderboardScreen;