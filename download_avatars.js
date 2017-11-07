var secret = require('./secret');

function getRepoContributors(repoOwner, repoName, cb) {
	console.log('Welcome to the GitHub Avatar Downloader!');
  var request = require('request');
 var options= {
 	
 	url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  headers:{
  	'User-Agent':secret.GITHUB_TOKEN
  }
};
  request(options, function(err, res, body) {
    
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
