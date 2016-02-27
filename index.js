/* jshint ignore:start */

var express = require('express'),
    exphbs = require('express-handlebars'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express()
        .use(bodyParser.json()) // support json encoded bodies
        .use(bodyParser.urlencoded({extended: true})) // support encoded bodies

        .set('views', __dirname + '/views')
        .set('view engine', 'handlebars')
        .engine('handlebars', exphbs({defaultLayout: 'main'})),
    http = require('http').Server(app),
    io = require('socket.io')(http),

// Mongoose Schema definition
    Schema = new mongoose.Schema({
        at: Number,
        recipeName: String
    }),
    Usage = mongoose.model('Usage', Schema);

/*
 * MONGOLAB_URI=mongodb://heroku_0k8m5frr:vkmas4ao9nllcp860810556rjl@ds055945.mongolab.com:55945/heroku_0k8m5frr
 */
mongoose.connect('mongodb://localhost:27017/repeatit', function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});


app.get('/', function (req, res) {
    res.render('home');
})
    .get('/usages', function (req, res) {
        Usage.find(function (err, usages) {     // http://mongoosejs.com/docs/api.html#query_Query-find
            res.status(200).json(usages)
        });
    })
    .post('/usage', function (req, res) {
        var usage = new Usage(req.body);
        usage.id = usage._id;
        usage.save(function (err) {     // http://mongoosejs.com/docs/api.html#model_Model-save
            res.status(200).json(usage);
            io.emit('new usage', usage.toJSON());
        });
    })

    .use(express.static(__dirname + '/'));

http.listen(process.env.PORT || 5000);

io.on('connection', function (socket) {
    console.log('A user connected');
});