exports.insert = (table) => {
    return `INSERT INTO ${table} SET ? `
}
exports.insertData = (table, columns, data) => {
    return `INSERT INTO ${table}(${columns}) VALUES(${data})`
}
exports.selects = (table, cond, pass) => `SELECT * FROM ${table} WHERE username=${cond} AND password=${pass}`;
exports.selectsAll = (table) => ` SELECT * FROM ${table} `;
exports.selector = (table, kind) => `SELECT ${kind} FROM ${table}`;
exports.alter = (database, username) => `ALTER 'TABLE' users CHANGE 'password' 'password' VARCHAR(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL`
exports.update = (table) => `UPDATE ${table} SET ? WHERE ?`
exports.createDB = (base) => `CREATE DATABASE IF NOT EXISTS ${base}`; //Create a DB
exports.createTable = (model) => `CREATE TABLE IF NOT EXISTS ${Object.keys(model)[0]}(${require('../../functions').extractModelColumns(model)})`;
exports.con = (db) => {
    return {
        host: require('../../config').db.host || "localhost", //Change it with yourown host
        user: require('../../config').db.user, //Change it with yourown username
        password: require('../../config').db.pass, //Change it with yourown pass
        database: db || require('../../config').db.database
    }

}
exports.dbconnection = {
    host: require('../../config').db.host || "localhost", //Change it with you rown host
    user: require('../../config').db.user, //Change it with your own username
    password: require('../../config').db.pass, //Change it with your own pass
};
/*
    module.exports = {
        insert: (table) => {
            return `INSERT INTO ${table}  SET ?`
        }, // Insert data
        selects: (table, cond, pass) => `SELECT * FROM ${table} WHERE username=${cond} AND password=${pass}`, // Select with conditions
        selectsAll: (table) => ` SELECT * FROM ${table} `, // Select all from a specied table
        selectorf: () => `SELECT category FROM products`,
        selector: (table, ...sort) => `SELECT ${sort} FROM ${table} WHERE ?`, // Select all from a specied table
        alter: (database, username) => `ALTER 'TABLE' users CHANGE 'password' 'password' VARCHAR(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL`,
        update: (table) => `UPDATE ${table} SET ? WHERE ?`, //Update table
        createDB: (base) => `CREATE DATABASE IF NOT EXISTS ${base}`, //Create a DB
        createTable: (table, ...n) => `CREATE TABLE IF NOT EXISTS ${table}(${n.join(",")})`,
        dbconnections: class {
            constructor(initDB) { this.initDB() }
            initDB() {
                return {
                    host: "localhost", //Change it with yourown host
                    user: "root", //Change it with yourown username
                    password: "preferedOne", //Change it with yourown pass
                    database: "MorningShop" //Change it with yourown Dbase
                }
            }
            altDB(h, u, p, d) {
                return {
                    host: this.h,
                    user: this.u,
                    password: this.p,
                    database: this.d
                }
            }
        },

        dbconnection: {
            host: "localhost", //Change it with yourown host
            user: "root", //Change it with yourown username
            password: "preferedOne", //Change it with yourown pass
            database: "MorningShop"
        },
        con: (db) => {
            return {
                host: "localhost", //Change it with yourown host
                user: "root", //Change it with yourown username
                password: "preferedOne", //Change it with yourown pass
                database: db
            }

        },
        init: {
            altConnection: {
                host: "localhost", //Change it with yourown host
                user: "root", //Change it with yourown username
                password: "preferedOne" //Change it with yourown pass
            },
            createDBs: (db) => `CREATE DATABASE IF NOT EXISTS ${db.replace('"',"")}`, //Create databases
            createTables: (table, ...n) => `CREATE TABLE IF NOT EXISTS ${table}(${n})`, //Create tables
            createTablesCCID: (table, ...n) => `CREATE TABLE IF NOT EXISTS ${table}(id INT AUTO_INCREMENT PRIMARY KEY,${n})`, //Create tables with Initial Auto incremented id
            createDB: `CREATE DATABASE IF NOT EXISTS MorningShop`, //This is used to initially create a DB with Altnate Connection
            createTable: `CREATE TABLE IF NOT EXISTS users(id INT AUTO_INCREMENT PRIMARY KEY,firstname VARCHAR(255),lastname VARCHAR(255),emailAddress VARCHAR(255),password VARCHAR(25),member INT)`, //This is used to initially create a TB with Altnate Connection
            // seach: (table, holder, ...sort) => `SELECT * FROM ${table} WHERE ${holder} LIKE'%${sort}%'`
        }
    };

    class Connections {
        constructor(init) { this.init() }
        init(host, user, password) {
            const initialize = () => {
                this.host = host,
                    this.user = user,
                    this.password = password

            };
            return initialize;
        }
        altConnection() {
            return {
                host: "localhost",
                user: "root",
                password: "preferedOne"
            }
        }
        connect(db) {
            return {
                host: "localhost",
                user: "root",
                password: "preferedOne",
                database: db
            }
        }
        connector(host, user, password, database) {
            const connectorInitialize = () => {
                this.host = host,
                    this.user = user,
                    this.password = password,
                    this.database = database

            };
            return connectorInitialize
        }
    }
    connections = new Connections;
	exports = connections;
	
	CREATE TABLE `track_expenses`.`branch` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR NOT NULL , `budget` VARCHAR NOT NULL , `income` VARCHAR NOT NULL , `expenses` VARCHAR NOT NULL , `balance` VARCHAR NOT NULL , `manager_id` VARCHAR NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
    */