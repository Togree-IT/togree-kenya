exports.rates = {
    id: {
        TYPE: "INT",
        AUTO_INCREMENT: true,
        PRIMARY_KEY: true,
        DEFAULT: ''
    },
    customer_name: {
        TYPE: "VARCHAR(255)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    icon: {
        TYPE: "VARCHAR(255)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "assets/img/user/user.png",
    },
    rate: {
        TYPE: "FLOAT",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: 0.0,
    },
}