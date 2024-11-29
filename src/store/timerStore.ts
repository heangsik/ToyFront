import { writable, type Writable } from 'svelte/store';
import { createDb, type Timer } from '$lib/db/indexdb';
// import type { Timer } from '$lib/db/indexdb';

export function TimerStore() {
	const { subscribe, set, update }: Writable<Timer[]> = writable([]);
	return {
		subscribe,
		async loadDb() {
			const db = await createDb();
			const timers = await db.getAll('timers');
			await db.close();
			set(timers);
		}
	};
}
