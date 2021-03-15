 function openIDB(dbname, vr, calback) {

     return idb.open(dbname, vr, calback)

 };

 function IDBmethods(promiseFromDb, _objectStore) {
     //  promiseFromDb = promiseFromDb;
     //  console.log(promiseFromDb);
     this._objectStore = _objectStore;

     return {
         deledata(name) {
             const promiseDb = promiseFromDb;
             return promiseDb.then((db) => {
                 const tx = db.transaction(_objectStore, "readwrite");
                 const store = tx.objectStore(_objectStore);

                 store.delete(name);
             })
         },

         getdata(name, indexName) {
             const promiseDb = promiseFromDb;

             return promiseDb.then((db) => {
                 const tx = db.transaction(_objectStore);
                 const store = tx.objectStore(_objectStore);
                 let indexOthis;


                 if (indexName) {
                     return indexOthis = store.index(indexName);
                 }
                 if (name) {
                     if (!indexName) {
                         return store.get(name);
                     }
                     return indexOthis.get(name)
                 } else {
                     if (!indexName) {
                         return store.getAll();
                     }
                     return indexOthis.getAll();
                 }
             })
         },
         updateProperty(key, property, value) {
             return promiseFromDb.then(db => {
                 const tx = db.transaction(_objectStore, "readwrite");
                 const store = tx.objectStore(_objectStore);
                 // const storeIndex = store.index(index);
                 // return storeIndex.openCursor(/*key, 'next'*/);
                 return store.openCursor( /*key, 'next'*/ );
             }).then(updateCurs = (cursor) => {
                 if (!cursor) return;
                 let data = cursor.value;
                 let _properties = data.__proto__.constructor.getOwnPropertyNames(data);
                 for (newDataProperty of _properties) {
                     if (newDataProperty == key) {
                         data[key][property] = value;
                     }
                 }
                 cursor.update(data);
                 return cursor.continue();
             })
         },
         putdata(data = {}) {
             const promiseDb = promiseFromDb;
             return promiseDb.then((db) => {
                 const tx = db.transaction(_objectStore, "readwrite");
                 let store = tx.objectStore(_objectStore);

                 return store.put(data)
             })
         },

         set(key, val) {
             const promiseDb = promiseFromDb;
             return promiseDb.then(db => {
                 const tx = db.transaction(_objectStore, 'readwrite');
                 tx.objectStore(_objectStore).put(val, key);
                 return tx.complete;
             });
         },

         clear() {
             const promiseDb = promiseFromDb;
             return promiseDb.then(db => {
                 const tx = db.transaction(_objectStore, 'readwrite');
                 tx.objectStore(_objectStore).clear();
                 return tx.complete;
             });
         },

         keys(promiseFromDb, _objectStore) {
             const promiseDb = promiseFromDb;
             return promiseDb.then(db => {
                 const tx = db.transaction(_objectStore);
                 const keys = [];
                 const store = tx.objectStore(_objectStore);

                 // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
                 // openKeyCursor isn't supported by Safari, so we fall back
                 (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
                     if (!cursor) return;
                     keys.push(cursor.key);
                     cursor.continue();
                 });

                 return tx.complete.then(() => keys);
             });
         },

         logCursor(index, key) {
             const promiseDb = promiseFromDb;
             return promiseDb.then(db => {
                     const tx = db.transaction(_objectStore);
                     const store = tx.objectStore(_objectStore);
                     const storeIndex = store.index(index);

                     return storeIndex.openCursor( /*key, 'prev'*/ );
                 })
                 .then(logpe = (cursor) => {
                     if (!cursor) return;
                     return cursor.continue().then(logpe), cursor.value
                 })
         },


         update(index, key, value) {
             const promiseDb = promiseFromDb;
             return promiseDb.then(db => {
                 const tx = db.transaction(_objectStore, "readwrite");
                 const store = tx.objectStore(_objectStore);
                 const storeIndex = store.index(index);
                 storeIndex.openCursor().then(cursor => {
                     console.log(cursor);
                 })

                 store.openCursor( /*key, 'next'*/ )
                     .oncomplete = function updateCurs(cursor) {

                         if (!cursor) return;
                         let data = cursor.value;

                         console.log(Object.keys(data));
                         let _properties = data.__proto__.constructor.getOwnPropertyNames(data);
                         console.log(_properties);
                         for (newDataProperty of _properties) {
                             if (newDataProperty == key) {

                                 data[key] = value;

                             }
                         }

                         cursor.update(data);
                         return cursor.continue();
                     }
             })
         },

         updateProperty( /*index,*/ key, property, value) {
             const promiseDb = promiseFromDb;
             return promiseDb.then(db => {
                 const tx = db.transaction(_objectStore, "readwrite");
                 const store = tx.objectStore(_objectStore);

                 return store.openCursor( /*key, 'next'*/ );
             }).then(updateCurs = (cursor) => {
                 if (!cursor) return;
                 let data = cursor.value;
                 let _properties = data.__proto__.constructor.getOwnPropertyNames(data);
                 for (newDataProperty of _properties) {
                     if (newDataProperty == key) {

                         data[key][property] = value;

                     }
                 }

                 cursor.update(data);
                 return cursor.continue();
             })
         }
     }

 }