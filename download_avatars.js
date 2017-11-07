function getRepoContributors(repoOwner, repoName, cb) {
 var request = require('request');
 console.log('Welcome to the GitHub Avatar Downloader!');
 request.get('https://api.github.com/repos/jquery/jquery/contributors')
    .on('error', function (err) {                                   // Note 2
         throw err; 
       })
       .on('response', function (response) {                           // Note 3
         });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});