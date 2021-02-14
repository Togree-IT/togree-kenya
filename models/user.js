// const md5 = require("c:/nemie-made/morning-shop/assets/js/md5")


exports.users = {
    id: {
        TYPE: "INT",
        AUTO_INCREMENT: true,
        PRIMARY_KEY: true,
        DEFAULT: ''
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
        TYPE: "VARCHAR(55)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    email: {
        TYPE: "VARCHAR(55)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    agent_id: {
        TYPE: "VARCHAR(25)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    position: {
        TYPE: "VARCHAR(25)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    status: {
        TYPE: "VARCHAR(12)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    user_icon: {
        TYPE: "VARCHAR(252)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "assets/imgs/user.svg",
    },
    branch_id: {
        TYPE: "INT",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },

    dt: {
        TYPE: "TIMESTAMP",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "CURRENT_TIMESTAMP"

    }
}