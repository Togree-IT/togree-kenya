// DB
const db = require('../functions').conn;

let conn = db(con => {

    if (con && con.state === "connected") {
        const dbName = require('./index').db.database;

        return conn.query(require('../functions/dbHelper').createDB(dbName), (err, _res) => {
            if (err) throw err;
            conn.config.database = dbName;
            // {
            //     name: "user",
            //     hasInitialData: true,
            // },
            conn.destroy();
            let art_initialDBData = [{
                    name: "user",
                    hasInitialData: true,

                },
                {
                    name: "product",
                    hasInitialData: true,

                },
                {
                    name: "blog",
                    hasInitialData: !true,

                },
            ];

            if (art_initialDBData.length) {
                conn = require('../functions').con(dbName, _con => {
                    if (_con && _con.state === "connected") {
                        const initialDBData = new Promise(
                            (res, rej) => {
                                for (let model of art_initialDBData) {

                                    try {
                                        require('../functions').insertInitialDBData(conn, model);
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

        }).on("end", (res, index) => {
            console.log(res);
            return conn
        });

    }

});

module.exports = conn;