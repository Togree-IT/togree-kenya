exports.products = {

    id: {
        TYPE: "INT",
        AUTO_INCREMENT: true,
        PRIMARY_KEY: true,
        DEFAULT: ''
    },
    product_id: {
        TYPE: "VARCHAR(255)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: ''
    },
    name: {
        TYPE: "VARCHAR(25)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    product_img: {
        TYPE: "VARCHAR(252)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    product_preview_imgs: {
        TYPE: "VARCHAR(256)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    product_model: {
        TYPE: "VARCHAR(30)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    category_id: {
        TYPE: "VARCHAR(255)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    short_description: {
        TYPE: "VARCHAR(500)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    description: {
        TYPE: "TEXT",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    features: {
        TYPE: "TEXT",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    specs: {
        TYPE: "TEXT",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "",
    },
    price: {
        TYPE: "FLOAT",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: ''
    },

    product_rate: {
        TYPE: "FLOAT",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: '',
    },

    recommended: {
        TYPE: "VARCHAR(6)",
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