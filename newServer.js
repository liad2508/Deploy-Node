const express = require('express');
const app = express();
const bodyParser = require('body-parser'); app.use(bodyParser.json());
let scholar = require('google-scholar-extended');

app.post('/scholar', function(req, res) {
    var name = req.body;
    console.log(name.name);
    serachScholar(name.name, res)
    console.log('finish')
    //res.send("resource added!");
});

function serachScholar(name, res1) {
    var resultFromServer = [];
    scholar.search(name)
        .then(resultsObj => {
            console.log(('Google Scholar found ' + resultsObj.count + ' results'))
            for (var res in resultsObj.results) {
                console.log(res)
                if (resultsObj.results[res].url != undefined) {
                    //resultsObj.results[res].push({number: res})
                    //resultFromServer.push({name:res, r:resultsObj.results[res]})
                    //resultFromServer.push({Results:resultsObj.results[res]})
                    resultFromServer.push(resultsObj.results[res])
                    //



                    //
                    console.log(resultsObj.results[res])
                }
            }


            //resultFromServer.push({name:'number of result', r:resultsObj.count})

             var getResult = {count: resultsObj.count, result: resultFromServer}
             res1.send(getResult);
            //res.send(JSON.stringify(resultFromServer));
        })
}

app.listen(process.env.PORT || 3000, function() {
    console.log('server is listening on port 3000...')
});