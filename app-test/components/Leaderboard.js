import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getLeaderboard } from '../leaderboard';

const Leaderboard = () => {
	const [leaderboard, setLeaderboard] = useState([]);

	useEffect(() => {
		const fetchLeaderboard = async () => {
			const data = await getLeaderboard();
			setLeaderboard(data);
		};

		fetchLeaderboard();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Leaderboard</Text>
			{leaderboard.map((entry, index) => (
				<Text key={index} style={styles.entry}>
					{index + 1}, {entry.title}: {entry.score}
				</Text>
			))}
		</View>
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

export default Leaderboard;