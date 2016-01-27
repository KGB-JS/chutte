var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var utils = require('./utils.js');

module.exports = function(app, express) {
    var userRouter = express.Router();
    var itemsRouter = express.Router();

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, '/../../client/public')));

    app.use('/api/users', userRouter);
    require('../user/userRoutes.js')(userRouter);

    app.use('/api/items', itemsRouter);
    require('../items/itemRoutes.js')(itemsRouter);


    app.use('*', function(req, res) {
        res.status(404).send('404: Page not found');
    });

    app.use(utils.logError);
    app.use(utils.handleError);

};
