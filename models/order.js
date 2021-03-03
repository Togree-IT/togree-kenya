exports.orders = {

    id: {
        TYPE: "INT",
        AUTO_INCREMENT: true,
        PRIMARY_KEY: true,
        DEFAULT: ''
    },
    order_id: {
        TYPE: "VARCHAR(255)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: 'TG-' + new Date().getFullYear() + '-' + require('shortid').generate()
    },
    products: {
        TYPE: "VARCHAR(255)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    status: {
        TYPE: "VARCHAR(25)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    quantity: {
        TYPE: "INT(255)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    total: {
        TYPE: "FLOAT",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    currency: {
        TYPE: "VARCHAR(25)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    customer_id: {
        TYPE: "INT",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    payment_id: {
        TYPE: "FLOAT",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    billing_id: {
        TYPE: "INT",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    shipping_id: {
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