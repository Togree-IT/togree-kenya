// DB
const db = require('../functions').conn,
    fs = require('fs'),
    path = require('path');
const seesionDbName = require('./index').db.sessionDB;

exports.sessionConn = cb => db(con => {

    if (con && con.state === "connected") {

        // create session store
        con.query(require('../functions/dbHelper').createDB(seesionDbName), (err, _res) => {
            if (err) throw err;
            // destroy connection
            con.config.database = seesionDbName;
            // con.destroy();
        });

        if (cb) cb(con, seesionDbName);

        return seesionDbName;
    }
}).config.database = seesionDbName;

let conn = cb => db(con => {
    if (con && con.state === "connected") {
        const dbName = require('./index').db.database;

        // Add initial DBs
        return con.query(require('../functions/dbHelper').createDB(dbName), (err, _res) => {
            if (err) throw err;
            // assign database name
            con.config.database = dbName;

            // destroy connection
            con.destroy();

            let rdir = fs.readdirSync(path.resolve(__dirname, './../models'), { withFileTypes: true });

            let art_initialDBData = [];
            rdir.map(file => {
                if (!file.isDirectory()) {
                    if (file.name.endsWith('.js')) {
                        file.name = file.name.split('.js').join('')
                        art_initialDBData.push({
                            name: file.name,
                            hasInitialData: fs.existsSync(path.resolve(__dirname, './../models/data/' + file.name + 's.js'))
                        })

                    }
                }
            });


            if (art_initialDBData.length) {
                con = require('../functions').con(dbName, _con => {
                    if (_con && _con.state === "connected") {
                        const initialDBData = new Promise(
                            (res, rej) => {
                                for (let model of art_initialDBData) {

                                    try {
                                        // Insert Initial Data
                                        require('../functions').insertInitialDBData(con, model);
                                        res("Done")
                                    } catch (error) {
                                        rej(error)
                                    }
                                }
                            }
                        );

                        initialDBData.catch(_err => {
                            console.log(_err);
                        })

                    }
                });
            }

            if (typeof cb === 'function') {
                cb(con)
            }

        })


    }

});

exports.con = conn;
// module.exports = ;