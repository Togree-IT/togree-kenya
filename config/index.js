exports.db = {
    host: process.env.CLEARDB_DATABASE_URL || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    pass: process.env.MYSQL_PASSWORD || 'iIZzUxjNMQVs2Cc' || 'made22',
    database: process.env.MYSQL_DATABASE || 'togree_kenya',
    sessionDB: 'togree_kenya_session',
}

exports.privillege = [
    'super_admin', 'admin', 'reseler', 'client',
];
// mysql://bcb9bab974d9d9:9666e302@us-cdbr-east-03.cleardb.com/heroku_15e7671e2226a40?reconnect=true
exports.DBERROR = "DBERROR: Connection to db refused to start, check your database config file for more";