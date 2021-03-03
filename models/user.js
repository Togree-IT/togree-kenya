// const md5 = require("c:/nemie-made/morning-shop/assets/js/md5")


exports.users = {
    id: {
        TYPE: "INT",
        AUTO_INCREMENT: true,
        PRIMARY_KEY: true,
        DEFAULT: ''
    },
    customer_id: {
        TYPE: "VARCHAR(55)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "TG-" + require('shortid').generate(),
    },
    name: {
        TYPE: "VARCHAR(25)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    username: {
        TYPE: "VARCHAR(25)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    password: {
        TYPE: "VARCHAR(255)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    email: {
        TYPE: "VARCHAR(25)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    phone: {
        TYPE: "VARCHAR(25)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    street: {
        TYPE: "VARCHAR(25)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    zipcode: {
        TYPE: "VARCHAR(12)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    privillege: {
        TYPE: "VARCHAR(12)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "client",
    },
    currency: {
        TYPE: "VARCHAR(12)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "USD",
    },
    reseler_id: {
        TYPE: "VARCHAR(55)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    user_icon: {
        TYPE: "VARCHAR(252)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "assets/imgs/profile/user.svg",
    },
    dt: {
        TYPE: "TIMESTAMP",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "CURRENT_TIMESTAMP"

    }
}