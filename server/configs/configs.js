module.exports =  {
    db:'mongodb://localhost:27017/userdb',
    mongodbOptions:{
        mongoDBOptions: {
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000,
            keepAlive: 1,
            connectTimeoutMS: 30000,
            useNewUrlParser: true,
            native_parser: true,
            poolSize: 5,
            useUnifiedTopology: true,
            useFindAndModify: false
        },
    },
    baseApiUrl:'/api',
    serverPort:'3000'
}