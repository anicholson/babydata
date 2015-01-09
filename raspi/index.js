var Keen = require('keen.io');

var keen_client = Keen.configure({
    projectId: '54a9c578d2eaaa562d64cbc8',
    writeKey: '38c2527ef8ac2ae48f1322733e250409aa0743227e3f69a187ed6c20890c299fbba51a30ee34cb1e9eb56d1c318b9659a34a46af7ecb3fd36377b7380f596f53a120a7398a7f8a7517b88b46d9960944a834ee2d901ba5c1ade218e9cfa9c87d185e986b4c99c6a7b4f86513db3dc1a8',
    readKey: 'b09f9e381a380a2f73e18a3a7d80e7ac521c5ec9fc5349f7c2d5912859545156e86ab13f9592b595c029f7a1fdfeb314895a435eaf5b63776433c430e389d1c4267b8a099b75fd69ad88a392ea4e815616168be26dceedadac5ad2ea75bc6f8d8014f9fd4262ee8eaaf525302fcac030',
    masterKey: '4E3046B0B412A0B7E0605C4EB3FD6C84'
});

var keenCallback = function(error, result) {
    console.log("We heard back!");
    if(error) {
        console.log("Crap: ", error);
        return false;
    } else {
        console.log("Woo!: ", result);
        return true;
    }
}

var anEventHappened = function(fooValue) {
    keen_client.addEvent(
        "Testing Keen.IO connection",
        { "foo": fooValue, "time": new Date().toISOString() },
        keenCallback
    );
};


var eventGenerator= function() {
    var i = 0;

    return function() {
        i += 1;
        console.log("Firing event:", i);
        anEventHappened(i);
    }
}();

setInterval(eventGenerator, 1000);
