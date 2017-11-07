var args = process.argv;
var repoOwner = args[2];
var repoName = args[3]; 
var secret = require('./secret');

function getRepoContributors(repoOwner, repoName, cb) {
  console.log('Welcome to the GitHub Avatar Downloader!');
  var request = require('request');
  var options = {
 	
 	  url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers:{
  	  'User-Agent':secret.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    
    cb(err, body);
  });
}


function downloadImageByURL(url, filePath) {
 
  var request = require('request');
  var fs = require('fs');
  console.log('Downloading Image');
  request.get(url)               // Note 1
         .on('error', function (err) {                                   // Note 2
           throw err; 
         })
         .on('response', function (response) {                           // Note 3
           console.log('Response content type:',response.headers['content-type']);

         })
         .pipe(fs.createWriteStream(filePath)); 

  console.log('Download complete.');
}

if(repoOwner === undefined || repoName === undefined){
  console.log("You're missing an argument");
} else {
  getRepoContributors(repoOwner, repoName, function(err, result) {
  // console.log("Errors:", err);
  // console.log("Result:", result);

    console.log(repoOwner);
    console.log(repoName);
    var temp = JSON.parse(result);
    for (var r in temp){
  	var url = temp[r].avatar_url;
  	var filePath = "avatars/" + temp[r].login +".jpg";
  	downloadImageByURL(url, filePath);
    }
  });
}