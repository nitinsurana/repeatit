/* jshint ignore:start */

var express = require('express'),
    exphbs = require('express-handlebars'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    _ = require('underscore'),
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
        totalTime: Number,
        userId: String
    }),
    Usage = mongoose.model('Usage', Schema);

var recordingSchema = new mongoose.Schema({
        steps: Array,
        recipeId: String,
        userId: String,
        project: String,
        title: String,
        id: String
    }),
    Recording = mongoose.model('Recording', recordingSchema);

var MONGO_CONNECTION_URI = process.env.MONGO_CONNECTION_URI || 'mongodb://heroku_0k8m5frr:vkmas4ao9nllcp860810556rjl@ds055945.mongolab.com:55945/heroku_0k8m5frr';
mongoose.connect(MONGO_CONNECTION_URI, function (error) {
    if (error) console.error(error);
    else console.log('Mongo Connected : ' + MONGO_CONNECTION_URI);
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
        Recording.findById(recording._id && recording._id.toString(), function (err, savedRecording) {
            if (!savedRecording) {
                savedRecording = recording;
            } else {
                savedRecording.steps = recording.steps;
                savedRecording.recipeId = recording.recipeId;
                savedRecording.userId = recording.userId;
                savedRecording.project = recording.project;
                savedRecording.title = recording.title;
                savedRecording.id = recording.recipeId;
            }
            savedRecording.save(function (err) {
                res.status(200).json(savedRecording);
            });
        });
    })
    .get('/del-record', function (req, res) {
        Recording.findById(req.query._id, function (err, recording) {
            if (recording && recording.userId === req.query.userId) {
                recording.remove();
                res.status(200).json({status: true});
            } else {
                res.status(403).json({status: false});
            }
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
