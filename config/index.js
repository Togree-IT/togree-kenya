exports.db = {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    pass: process.env.MYSQL_PASSWORD || 'iIZzUxjNMQVs2Cc' || 'made22',
    database: process.env.MYSQL_DATABASE || 'togree_kenya',
}
exports.privillege = [
    'super_admin', 'admin', 'reseler', 'client',
]

exports.DBERROR = "DBERROR: Connection to db refused to start, check your database config file for more";