var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    http = require('http'),
    unirest = require('unirest');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname));

var server = app.listen(process.env.PORT || 8080, function() {
        var port = server.address().port;
        console.log('Connected Captain. Safe journey.');
        console.log('App now running on port', port);
});

// Creates New User Profile, adding starter-kit artworks
// app.post('/newUser', function(req, response) {
//     UserProfile.create({
//         user: req.body.user,
//         dateRotationWasUpdate: getDate()
//     }, function(err, newUser) {
//         if (err) {
//             return response.status(500).json(err)
//         }
//         // PaintingAttributes.find({ special_notes: "starter_kit" })
//         // .populate('PaintingAttributes')
//         // .exec (function(err, newEntry){
//         //     console.log(newEntry)
//         // })
//         PaintingAttributes.find({ special_notes: "starter_kit" }, function(err, starter_kit) {
//             if (err) {
//                 return response.status(500).json(err)
//             }
//             console.log('this is the starter_kit', starter_kit)
//             urls = starter_kit.map(function(obj) {
//                 //TODO - homework: map functions in javscript - functional programming
//                 return obj.url;
//             })
//             console.log('this is the urls mapped. take a look------', urls);
//             UserProfile.update({ _id: newUser._id }, { artWorksOnRotation: starter_kit }, function(err, updatedUser) {
//                 if (err) {
//                     console.log(err, 'error');
//                 }
//             });
//         })
//         response.json(newUser)
//         console.log('new user created--------', newUser)
//     })
// });

// Gets artwork from artsy
app.get('/artworks/:id', function(req, response) {
    var id = req.params.id;
    unirest.post('https://api.artsy.net/api/tokens/xapp_token')
        .headers({ 'Accept': 'application/json' })
        .send({ "client_id": "cd7051715d376f899232", "client_secret": "de9378d3d12c2cbfb24221e8b96d212c" })
        .end(function(res) {
            unirest.get('https://api.artsy.net/api/artworks/' + id)
                .headers({ 'Accept': 'application/json', 'X-XAPP-Token': res.body.token })
                .end(function(res_) {
                    console.log(res_.body)
                    response.json(res_.body)
                })
        });
});
// gets random painting and attributes from artsy.net
app.get('/paintingToDisplay', function(req, response) {
    unirest.post('https://api.artsy.net/api/tokens/xapp_token')
        .headers({ 'Accept': 'application/json' })
        .send({ "client_id": "cd7051715d376f899232", "client_secret": "de9378d3d12c2cbfb24221e8b96d212c" })
        .end(function(res) {
            unirest.get('https://api.artsy.net/api/artworks?sample=1')
                .headers({ 'Accept': 'application/json', 'X-XAPP-Token': res.body.token })
                .end(function(res_) {
                    console.log(res_.body)
                    response.json(res_.body)
                })
        });
});

app.get('/:user/paintingsToDisplay', function(req, response) {
    var user = req.params.user
    UserProfile.findOne({ user: user }, function(err, user) {
        if (err) {
            return response.status(500).json(err)
        }
        console.log('here');
        console.log('returning response', user)
        response.status(201).json(user.artWorksOnRotation)
    })
});

exports.app = app;
