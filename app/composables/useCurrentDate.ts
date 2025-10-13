import { today, getLocalTimeZone } from "@internationalized/date";

export const useCurrentDate = () => {
	const currentDate = ref(today(getLocalTimeZone()));

	const updateTodayDate = () => {
		currentDate.value = today(getLocalTimeZone());
	};

	let timeoutId: NodeJS.Timeout;
	let intervalId: NodeJS.Timeout;
	onMounted(() => {
		const now = new Date();
		const msUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();

		timeoutId = setTimeout(() => {
			updateTodayDate();
			intervalId = setInterval(updateTodayDate, 24 * 60 * 60 * 1000); // Update daily
		}, msUntilMidnight);
	});

	onUnmounted(() => {
		clearTimeout(timeoutId);
		clearInterval(intervalId);
	});

	return {
		currentDate,
	};
};
