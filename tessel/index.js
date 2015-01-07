(function () {
    // Modules
    var tessel     = require('tessel'),
        ambientLib = require('ambient-attx4'),
        ambient    = ambientLib.use(tessel.port['A']);

    // Helper functions
    var mean = function(values) {
        return values.reduce(function(a, v) {
            return a + v;
        }, 0) / values.length;
    };

    var stddev = function(values) {
        var v_mean = mean(values);

        var distances_from_mean = values.map(function(v) {
            return Math.pow((v - v_mean), 2);
        });

        return Math.sqrt(mean(distances_from_mean));
    };

    var rollingAdd = function(values, nextValue) {
        if (values.length >= 10) {
            values.shift();
        }

        return values.concat(nextValue);
    };


    var lightValues   = [],
        countedValues = 0;

    setInterval(function() {
        if (countedValues == 60) { process.exit(0); }

        ambient.getLightLevel( function(err, light_reading) {
            if(err) throw err;

            lightValues = rollingAdd(lightValues, light_reading);
            console.log("Average light:", mean(lightValues));
            console.log("Std Dev:", stddev(lightValues));
        });

        countedValues += 1;
    }, 500);
}());
