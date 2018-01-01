if(process.env.NODE_ENV === 'production'){
    module.exports = {
        mongoURI: 'mongodb://bianca:bianca@ds239047.mlab.com:39047/ideas-noter-production'
    }
}   else {
    module.exports = {
        mongoURI: 'mongodb://localhost/ideasnoter-dev'
    }
}