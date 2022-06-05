export {};

// interface TableKeyTypeMap {
//   todo: (keyof Item)[];
//   category: (keyof Category)[];
// }

// // // interface RawDataMap {
// // //   heartrate: HeartrateData[];
// // //   step: StepData[];
// // // }

// // // interface DataTypeMap {
// // //   heartrate: HeartrateData;
// // //   step: StepData;
// // // }
// type Data = Item | Category;
// type StoreType = 'todo' | 'category';
// // // type Data = HeartrateData | StepData;
// type Query<T extends Data> = {
//   [Key in keyof T]: {
//     from?: T[Key];
//     to?: T[Key];
//     exact?: T[Key];
//   };
// };

// type Options<T extends Data> = {
//   storeType: StoreType;
//   query: Query<T>;
// };

// const NAME = 'db_test';
// const VERSION = 1;

// const TABLE_KEYS: TableKeyTypeMap = {
//   todo: ['id', 'categoryId', 'createdAt', 'done', 'endDate', 'notes', 'priority', 'startDate', 'updatedAt', 'title'],
//   category: ['id', 'name', 'color'],
// };
// // const RAW_DATA: RawDataMap = {
// //   heartrate: [...HeartRate_0226_1, ...HeartRate_0419_2],
// //   step: [...Step_0417_3],
// // }

// const initDB = (db: IDBDatabase, storeType: StoreType, createRandom: boolean) => {
//   if (db.objectStoreNames.contains(storeType)) db.deleteObjectStore(storeType);

//   const objectStore = db.createObjectStore(storeType);

//   TABLE_KEYS[storeType].forEach((key) => {
//     objectStore.createIndex(key, key, { unique: key === 'id' });
//   });

//   objectStore.transaction.oncomplete = (event: Event) => {
//     const objectStoreRW = db.transaction(storeType, 'readwrite').objectStore(storeType);

//     const handleSuccess = (successEvent: Event) => {
//       console.log(`Data added to the store.`);
//     };

//     const handleError = (errorEvent: Event) => {
//       console.error(`Failed to add data to the store.`);
//     };

//     let addRequest;

//     RAW_DATA[storeType].forEach((data) => {
//       addRequest = objectStoreRW.add(data);

//       addRequest.onsuccess = handleSuccess;
//       addRequest.onerror = handleError;
//     });
//   };
// };

// const readDB = <T extends Data>(db: IDBDatabase, options: Options<T>) => {
//   const { storeType, query } = options;
//   const objectStore = db.transaction(storeType).objectStore(storeType);
//   const index = objectStore.index([...Object.keys(query)].join(', '));
//   const request = index.getAll(parseQuery(query));

//   request.onsuccess = (e: Event) => {
//     console.log(`Data added to the store.`);
//   };

//   request.onerror = (e: Event) => {
//     console.error(`Failed to read ${storeType} data`);
//   };
// };

// export const getData = <T extends Data>(options: Options<T>) => {
//   if (!('indexedDB' in window)) {
//     console.warn("This browser doesn't support IndexedDB");
//     return;
//   }

//   const openRequest = window.indexedDB.open(NAME, VERSION);
//   const { storeType } = options;

//   openRequest.onupgradeneeded = (e: IDBVersionChangeEvent) => {
//     initDB(openRequest.result, storeType);
//   };

//   openRequest.onsuccess = (e: Event) => {
//     readDB(openRequest.result, options);
//   };

//   openRequest.onblocked = () => {
//     console.warn('Failed to open DB.');
//   };
// };

// const parseQuery = <T extends Data>(query: Query<T>) => {};
