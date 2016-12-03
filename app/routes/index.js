var queryModel = require('../../models/queryModel');
var Query = queryModel.model('QueryData');
var request = require('request');

module.exports = function(app){
    app.get('/api/imagesearch', function (req, res) {
        var qry = req.query.q;
        var ofst = req.query.offset;
        var answer = "https://www.googleapis.com/customsearch/v1?key=%20AIzaSyBTwUL_8uVQf_jLKpxn4BtFUWT4c3a2nus&cx=010149064831520578435:silkegvtzym&searchType=image&start="+ofst+"&q="+qry;
        // Submit my search qury
        var searchQuery = new Query({
            query: qry,
            timestamp: new Date().toString()
        });
        searchQuery.save();
        //respond with search results
        request({url: answer}, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var myResultsObject = JSON.parse(body).items;
                var imageResults = myResultsObject.map(function(img){
                    // items.
                    var imageResultObj = {
                        'url': img.link,
                        'snipeet': img.snippet,
                        'thumbnail': img.image.thumbnailLink,
                        'context':img.image.contextLink
                    }
                    return imageResultObj;
                })
                res.json(imageResults);
            }

        })
    });

    app.get('/api/latest', function(req, res) {
        Query.find(function (err, data) {
            var queries = data.map(function(rslt){
                    return {
                        query: rslt.query,
                        timestamp: rslt.timestamp
                        }
                    });
                res.json(queries);
            });
    })
}
