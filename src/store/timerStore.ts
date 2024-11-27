import { writable, Writable } from "svelte/store";
import { createDb, timerif } from '$lib/db/indexdb';

export function timerStore() {
    const initialState: timerif = {
        intervals: [],
        currentInterval: 0,
        remainingSeconds: 0,
        isRunning: false,
        timerId: null,
        message: ''
    };
    const { subscribe, set, update }: Writable<timerif> = writable(initialState);
    return {
        subscribe,
        async loadDb() {
            const db = createDb();
            const timers = await db.getAll('timers');
            db.close();
            set(timers);
        }
    }
}