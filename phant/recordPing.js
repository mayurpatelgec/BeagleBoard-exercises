#!/usr/bin/env node

var child_process = require('child_process');
var request = require('request');

var ping = "ping -c3 -i0.25 rose-hulman.edu";
var phant_PUBLIC  = "4X9aed2JXgUlEV1m1bBvu0JBmY0";
var phant_PRIVATE = "qmLBjGrEmXCl3M7x7XPBc78zLR7";
var phant_DELETE  = "yqvelNGxqPhPv8g6gkOwcVNa2rV";
var site = "http://14.139.34.32:8080";
var url = site + "/input/" + phant_PUBLIC + "?private_key=" + phant_PRIVATE + "&time=1234";


child_process.exec(ping,
    function (error, stdout, stderr) {
        console.log('ping: ' + stdout);
        var test = [0];
        if(error || stderr) { 
            console.log('error: ' + error); 
            console.log('stderr: ' + stderr); 
        } else {    
            test = stdout.match(/time=[0-9.]* /mg);
            for(var i =0; i<test.length; i++) {
                test[i] = test[i].substring(5);     // Strip off the leading time=
            } 
        }
        
        console.log("test: " + test);
        console.log("url: " + url);
        request(url, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body); 
          } else {
            console.log("error=" + error + " response=" + JSON.stringify(response));
          }
        });

    }
);
