import { openDB, type IDBPIndex } from "idb";

export interface timerunitif{
    index: number,
    name: string,
    time: number
}
export interface timerif{
    id: number,
    name: string,
    timers: [timer: timerunit]
}

export async function createDb(){
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