<script lang="ts">
	import { onDestroy } from 'svelte';
	// 타이머 상태 관리
	interface TimerState {
		intervals: number[];
		currentInterval: number;
		remainingSeconds: number;
		isRunning: boolean;
		timerId: number | null;
	}

	let state: TimerState = {
		intervals: [5, 3, 5, 3], // 5분, 1분, 5분, 1분
		currentInterval: 0,
		remainingSeconds: 0,
		isRunning: false,
		timerId: null
	};

	let time = '00:00:00';

	// 시간 포맷팅
	function formatTime(seconds: number): string {
		const h = Math.floor(seconds / 3600);
		const m = Math.floor((seconds % 3600) / 60);
		const s = seconds % 60;
		return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
	}

	// 알림음 재생
	function playSound(isStart: boolean) {
		try {
			const audio = new Audio(
				'https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3'
			);
			audio.play();
			if (isStart) {
				console.log(`${state.currentInterval + 1}번째 타이머 시작`);
			} else {
				console.log(`${state.currentInterval + 1}번째 타이머 종료`);
			}
		} catch (error) {
			console.error('알림음 재생 실패:', error);
		}
	}

	// 타이머 초기화
	function initializeTimer() {
		state.remainingSeconds = state.intervals[state.currentInterval];
		time = formatTime(state.remainingSeconds);
	}

	// 타이머 업데이트
	function updateTimer() {
		state.remainingSeconds--;
		time = formatTime(state.remainingSeconds);
	}

	// 다음 타이머로 이동
	function moveToNextTimer() {
		clearInterval(state.timerId!);
		playSound(false);

		state.currentInterval = (state.currentInterval + 1) % state.intervals.length;

		if (state.currentInterval === 0) {
			stopTimer();
		} else {
			setTimeout(startTimer, 1000);
		}
	}

	// 타이머 시작
	function startTimer() {
		if (state.isRunning) return;

		state.isRunning = true;
		initializeTimer();
		playSound(true);

		state.timerId = setInterval(() => {
			updateTimer();

			if (state.remainingSeconds <= 0) {
				moveToNextTimer();
			}
		}, 1000);
	}

	// 타이머 정지
	function stopTimer() {
		if (state.timerId) {
			clearInterval(state.timerId);
			state.isRunning = false;
			state.currentInterval = 0;
			state.remainingSeconds = 0;
			time = '00:00:00';
		}
	}

	// 컴포넌트 정리
	onDestroy(() => {
		if (state.timerId) {
			clearInterval(state.timerId);
		}
	});
</script>

<main>
	<div class="timer-container">
		<div class="timer-display">{time}</div>
		<div class="controls">
			<button class="control-btn" on:click={startTimer} disabled={state.isRunning}> 시작 </button>
			<button class="control-btn" on:click={stopTimer} disabled={!state.isRunning}> 정지 </button>
		</div>
	</div>
</main>

<style>
	.timer-container {
		@apply flex flex-col justify-center items-center min-h-screen bg-gray-100 gap-5 border border-black;
		/* display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background-color: #f5f5f5;
		gap: 20px; */
	}

	.timer-display {
		@apply font-sans text-7xl font-bold text-gray-800 bg-white p-5 rounded-lg shadow-md font-sans;
		/* font-family: 'Digital', sans-serif;
		font-size: 72px;
		font-weight: bold;
		color: #333;
		background-color: #fff;
		padding: 20px 40px;
		border-radius: 10px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
	}

	.controls {
		@apply flex gap-3;
		/* display: flex;
		gap: 10px; */
	}

	.control-btn {
		@apply px-5 py-3 text-xl bg-green-500 text-white rounded-md cursor-pointer transition duration-300;
		/* padding: 10px 20px;
		font-size: 18px;
		border: none;
		border-radius: 5px;
		background-color: #4caf50;
		color: white;
		cursor: pointer;
		transition: background-color 0.3s; */
	}

	.control-btn:disabled {
		@apply bg-gray-300 cursor-not-allowed;
		/* background-color: #cccccc;
		cursor: not-allowed; */
	}

	.control-btn:hover:not(:disabled) {
		@apply bg-green-600;
		/* background-color: #45a049; */
	}
</style>
