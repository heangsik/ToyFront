import { openDB, type IDBPIndex } from 'idb';

export interface TimerUnit {
	index: number;
	name: string;
	time: number;
}
export interface Timer {
	id: number;
	name: string;
	timers: TimerUnit[];
}

export async function createDb(): Promise<IDBPIndex> {
	const db = await openDB('timerDb', 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains('timers')) {
				db.createObjectStore('timers', {
					keyPath: 'id',
					autoIncrement: true
				});
			}
		}
	});
	return db;
}
