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
        recipeName: String,
        internalIp: String,
        externalIp: String,
        totalTime: Number
    }),
    Usage = mongoose.model('Usage', Schema);

var recordingSchema = new mongoose.Schema({
        steps: Array,
        recipeId: String,
        userId: String,
        project:String
    }),
    Recording = mongoose.model('Recording', recordingSchema);

/*
 * MONGOLAB_URI=mongodb://heroku_0k8m5frr:vkmas4ao9nllcp860810556rjl@ds055945.mongolab.com:55945/heroku_0k8m5frr
 */
//mongoose.connect('mongodb://localhost:27017/repeatit', function (error) {
mongoose.connect('mongodb://heroku_0k8m5frr:vkmas4ao9nllcp860810556rjl@ds055945.mongolab.com:55945/heroku_0k8m5frr', function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});


app.get('/', function (req, res) {
    res.render('home');
})
    .get('/usages', function (req, res) {
        Usage.find({}, {}, {limit: 100, sort: {at: 1}}).find(function (err, usages) {     // http://mongoosejs.com/docs/api.html#query_Query-find
            res.status(200).json(usages)
        });
    })
    .post('/usage', function (req, res) {
        var usage = new Usage(req.body);
        usage.externalIp = req.connection.remoteAddress;
        usage.id = usage._id;
        usage.save(function (err) {     // http://mongoosejs.com/docs/api.html#model_Model-save
            res.status(200).json(usage);
            io.emit('new usage', usage.toJSON());
        });
    })
    .get('/groupUsage', function (req, res) {
        var mapReduce = {
            map: function () {
                var date = new Date(this.at);
                emit(date.toJSON().slice(0, 10), 1);
            },
            reduce: function (k, v) {
                return v.length;
            }
        };
        Usage.mapReduce(mapReduce, function (err, result) {
            res.status(200).json(result);
        });
    })
    .post('/record', function (req, res) {
        var recording = new Recording(req.body);
        recording.id = recording._id;
        recording.save(function (err) {
            res.status(200).json(recording);
            //io.emit('new recording',recording.toJSON());
        });
    })
    .get('/recordings', function (req, res) {
        Recording.find({userId: req.query.userId}, {}, {limit: 100}).find(function (err, recordings) {     // http://mongoosejs.com/docs/api.html#query_Query-find
            res.status(200).json(recordings)
        });
    })
    .use(express.static(__dirname + '/'));

http.listen(process.env.PORT || 5000);

io.on('connection', function (socket) {
    console.log('A user connected');
});
