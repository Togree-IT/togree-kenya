exports.offers = {

    id: {
        TYPE: "INT",
        AUTO_INCREMENT: true,
        PRIMARY_KEY: true,
        DEFAULT: ''
    },
    title: {
        TYPE: "VARCHAR(255)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: ""
    },
    price: {
        TYPE: "FLOAT",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: 0.00,
    },
    selling_price: {
        TYPE: "FLOAT",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: 0.00,
    },
    data: {
        TYPE: "TEXT",
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