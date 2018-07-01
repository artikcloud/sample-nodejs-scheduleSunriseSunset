var request = require("request");

var your_user_id = 'your_user_id';
var your_user_token = 'your_user_token';
var your_device_id = 'your_device_id';

var url = 'https://api.artik.cloud/v1.1/rules?userId' + your_user_id;


// Here let's prepare the rule that will be created into your account.
// name           - name of this rule which will be shown in user dashboard
// description    - description of the rule
// rule           - the `if` and `then` condition
// enabled        - we will create and have this rule enabled
// scope          - can be value of 'thisApplication' or 'allApplications' 
//                    'thisApplication' (rule is accessible only to this application)
//                    'allApplications' (rule is accessible to all applications)  

var rule_body = {
    "name": "Sample rule at sunset ",
    "description": "sample rule run at sunset",
    "rule": {"if":{}, "then":{}},
    "enabled": true,
    "scope": "thisApplication"
}


// Rule will trigger at sunset for the given geo location
// e.g. At Sunrise - "@sunrise 37.023 -121.51 +00:00 TZ America/Los_Angeles"
// e.g. At Sunset - "@sunset 37.023 -121.51 +00:00 TZ America/Los_Angeles"
// e.g. 2 hours before sunrise - "@sunrise 37.023 -121.51 -02:00 TZ America/Los_Angeles"
// e.g. 2 hours after sunrise - "@sunrise 37.023 -121.51 +02:00 TZ America/Los_Angeles"

rule_body.rule.if = {
  "field": "datetime",
  "operator": "=",
  "operand": {
    "value": "@sunset 37.023 -121.51 +00:00 TZ America/Los_Angeles"
  }      
}


// Here we define what action will be called when the above rule triggers
// In this example below, it will call the "setOn" action for the given device ID.
rule_body.rule.then = [{
    "ddid":your_device_id,
    "action":"setOn",
    "parameters":{}}
];


var options = { 
  method: 'POST',
  url: url,
  headers: 
   { 'Authorization': 'Bearer ' + your_user_token,
     'Content-Type': 'application/json' },
  body: rule_body,
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(JSON.stringify(body, null, 2));

// Example success response
//
// {
//   "data": {
//     "uid": "...",
//     "id": "00c9d5a24b59402da0e633f0703b79b2",
//     "aid": "...",
//     "name": "Sample rule at sunset ",
//     "languageVersion": 1,
//     "rule": {
//       "if": {
//         "field": "datetime",
//         "operator": "=",
//         "operand": {
//           "value": "@sunset 37.023 -121.51 +00:00 TZ America/Los_Angeles"
//         }
//       },
//       "then": [
//         {
//           "ddid": "...",
//           "action": "setOn",
//           "parameters": {}
//         }
//       ]
//     },
//     "enabled": true,
//     "index": 1,
//     "createdOn": 1530409333342,
//     "modifiedOn": 1530409333342,
//     "isTestable": true,
//     "scope": "thisApplication",
//     "description": "sample rule run at sunset"
//   }
// }

});

