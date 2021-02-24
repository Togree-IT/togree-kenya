exports.blog = {

    id: {
        TYPE: "INT",
        AUTO_INCREMENT: true,
        PRIMARY_KEY: true,
        DEFAULT: ''
    },
    title: {
        TYPE: "VARCHAR(50)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: ""
    },
    dt: {
        TYPE: "TIMESTAMP",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "CURRENT_TIMESTAMP"
    },
    body: {
        TYPE: "TEXT",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: ""
    },
    previewImage: {
        TYPE: "VARCHAR(252)",
        AUTO_INCREMENT: !true,
        PRIMARY_KEY: !true,
        DEFAULT: "../assets/img/blog/Blogimg.jpg"
    }


}