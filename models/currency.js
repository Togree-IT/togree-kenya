// const md5 = require("c:/nemie-made/morning-shop/assets/js/md5")


exports.currencys = {
    id: {
        TYPE: "INT",
        AUTO_INCREMENT: true,
        PRIMARY_KEY: true,
        DEFAULT: ''
    },
    name: {
        TYPE: "VARCHAR(55)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    fullname: {
        TYPE: "VARCHAR(25)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    rate: {
        TYPE: "FLOAT",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: 0.0,
    },
    global: {
        TYPE: "BOOLEAN",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: 0,
    },

    dt: {
        TYPE: "TIMESTAMP",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "CURRENT_TIMESTAMP"

    }
}