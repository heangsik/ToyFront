<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { timerStore } from '../../store/timerStore';

	// 타이머 상태 관리
	interface TimerState {
		intervals: number[];
		currentInterval: number;
		remainingSeconds: number;
		isRunning: boolean;
		timerId: number | null;
		message: string;
	}

	let state: TimerState = {
		intervals: [5, 3, 5, 3], // 초단위
		currentInterval: 0,
		remainingSeconds: 0,
		isRunning: false,
		timerId: null,
		message: ''
	};

	let time = '00:00:00';

	const tsimerStore = timerStore();

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
			// const audio = new Audio(
			// 	'https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3'
			// );
			// audio.play();
			if (isStart) {
				state.message = `${state.currentInterval + 1}번째`;
			} else {
			}
		} catch (error) {
			console.error('알림음 재생 실패:', error);
		}
	}

	// 타이머 초기화
	function initializeTimer() {
		state.remainingSeconds = state.intervals[state.currentInterval];
		time = formatTime(state.remainingSeconds);
		state.message = '';
	}

	// 타이머 업데이트
	function updateTimer() {
		state.remainingSeconds--;
		time = formatTime(state.remainingSeconds);
	}

	// 다음 타이머로 이동
	function moveToNextTimer() {
		// clearInterval(state.timerId!);
		playSound(false);

		state.currentInterval = (state.currentInterval + 1) % state.intervals.length;

		if (state.currentInterval === 0) {
			stopTimer();
		} else {
			state.remainingSeconds = state.intervals[state.currentInterval];
			initializeTimer();
			playSound(true);
			// setTimeout(startTimer, 1000);
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
			state.message = '타이머 종료';
		}
	}

	function addTime(seconds: number) {
		console.log('addTime:', seconds);
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
		<div class="timer-message">{state.message}</div>
		<div class="timer-display">{time}</div>
		<div class="controls">
			<button class="control-btn" on:click={startTimer} disabled={state.isRunning}> 시작 </button>
			<button class="control-btn" on:click={stopTimer} disabled={!state.isRunning}> 정지 </button>
		</div>
		<div class="add-control">
			<button
				type="button"
				class="add-btn"
				disabled={state.isRunning}
				on:click={() => addTime(10 * 60)}>10분</button
			>
			<button
				type="button"
				class="add-btn"
				disabled={state.isRunning}
				on:click={() => addTime(1 * 60)}>1분</button
			>
			<button type="button" class="add-btn" disabled={state.isRunning} on:click={() => addTime(10)}
				>10초</button
			>
		</div>
	</div>
</main>

<style lang="scss">
	.timer-container {
		@apply flex flex-col justify-center items-center min-h-screen bg-gray-100 gap-5 border border-black;
		.timer-message {
			@apply font-sans text-4xl text-gray-800;
		}
		.timer-display {
			@apply font-sans text-7xl font-bold text-gray-800 bg-white p-5 rounded-lg shadow-md;
		}

		.controls {
			@apply flex gap-3;
		}

		.control-btn {
			@apply px-5 py-3 text-xl bg-green-500 text-white rounded-md cursor-pointer transition duration-300;
		}

		.control-btn:disabled {
			@apply bg-gray-300 cursor-not-allowed;
		}

		.control-btn:hover:not(:disabled) {
			@apply bg-green-600;
		}

		.add-control {
			@apply flex gap-3;
			.add-btn {
				@apply px-5 py-3 text-xl bg-blue-500 text-white rounded-md cursor-pointer transition duration-300;
			}
			.add-btn:hover {
				@apply bg-blue-600;
			}
			.add-btn:disabled {
				@apply bg-gray-300 cursor-not-allowed;
			}
		}
	}
</style>
