import AsyncStorage from '@react-native-async-storage/async-storage';

const LEADERBOARD_KEY = '@leaderboard';

export const saveScore = async (title, score) => {
  try {
		const leaderboard = JSON.parse(await AsyncStorage.getItem(LEADERBOARD_KEY)) || [];
		leaderboard.push({ title, score });
		await AsyncStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
	} catch (error) {
		console.error(error);
	}
};

export const getLeaderboard = async () => {
	try {
		return JSON.parse(await AsyncStorage.getItem(LEADERBOARD_KEY)) || [];
	} catch(error) {
		console.error(error);
		return [];
	}
};