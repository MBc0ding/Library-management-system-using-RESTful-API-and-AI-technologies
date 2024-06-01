import bodyParser from 'body-parser';

export default function setupMiddleware(app) {
    app.use(bodyParser.json());
}


// or module.exports = function(app) { ..etc }  since we have only a single function with "app" as an argument for the moment. 