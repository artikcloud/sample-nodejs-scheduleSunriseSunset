# Sample creating a sunset/sunrise Rule

This is an ARTIK cloud services sample that creates a scheduled sunset/sunrise Rule.

1. Node and npm

* Node version >= 9.8.0
* npm version >= 5.8.1

Check your version by typing:

```bash
%> node --version
v9.8.0
%> npm --version
v5.8.1
```

2. You should be familiar with how to create an application, create device types, and add devices to your ARTIK cloud services account.

### Setup / Installation

1. Create a device type (or use an existing one) which has defined 1 or more Actions in its Manifest. In this sample we'll use the `setOn` action.
2. Connect a device (of above device type) to your account. Note the "device ID" from the [Devices dashboard](https://my.artik.cloud/devices).
3. [Create an application](https://developer.artik.cloud/documentation/user-management/authentication.html) (or use an existing one). Be sure your application has set "Read and Write" permissions on your device type from Step 1.   
4. Login to your newly created application and note the "user token".

### **Code setup**

1. Open the file `create-sunset-rule.js` and fill in the information you retrieved earlier:

```javascript
var your_user_id = 'your_user_id';
var your_user_token = 'your_user_token';
var your_device_id = 'your_device_id';
```

2. Continue to examine the rest of the file. For convenience we cover a few sections here:

```javascript
// Here we give the rule a name and description, 
var rule_body = {
    "name": "Sample rule at sunset ",
    "description": "sample rule run at sunset",
    "rule": {"if":{}, "then":{}},
    "enabled": true,
    "scope": "thisApplication"
}

// Here are few examples 
// Rule will trigger at sunset for the given geo location
// e.g. At Sunset - "@sunset 37.023 -121.51 +00:00 TZ America/Los_Angeles"
// e.g. 2 hours before sunset - "@sunset 37.023 -121.51 -02:00 TZ America/Los_Angeles"
// e.g. 2 hours after sunset - "@sunset 37.023 -121.51 +02:00 TZ America/Los_Angeles"

// Replace below to "@sunrise ..." for sunrise rather than sunset
rule_body.rule.if = {
  "field": "datetime",
  "operator": "=",
  "operand": {
    "value": "@sunset 37.023 -121.51 +00:00 TZ America/Los_Angeles"
  }
}

// Be sure to replace "setOn" below if your device has different actions available
// from your setup earlier
rule_body.rule.then = [{
    "ddid":your_device_id,
    "action":"setOn",
    "parameters":{}}
];
```

3. Finally install any dependencies by typing:

```
%> npm install
```

###1. Run sample  

Run the script via command line:

```
%> node create-sunset-rule.js
```

Here is the successful response data:

```javascript
{
  "data": {
    "uid": "...",
    "id": "00c9d5a24b59402da0e633f0703b79b2",
    "aid": "...",
    "name": "Sample rule at sunset ",
    "languageVersion": 1,
    "rule": {
      "if": {
        "field": "datetime",
        "operator": "=",
        "operand": {
          "value": "@sunset 37.023 -121.51 +00:00 TZ America/Los_Angeles"
        }
      },
      "then": [
        {
          "ddid": "...",
          "action": "setOn",
          "parameters": {}
        }
      ]
    },
    "enabled": true,
    "index": 1,
    "createdOn": 1530409333342,
    "modifiedOn": 1530409333342,
    "isTestable": true,
    "scope": "thisApplication",
    "description": "sample rule run at sunset"
  }
}
```

The Rule is now active and will trigger the specified Action at sunset for the GPS coordinates specified.

### 2. View this Rule in your account   

You can verify the Rule is added to your account by visiting the [Rules dashboard](https://my.artik.cloud/rules). Check ("*show private rules* …") to view any additional Rules that are only accessible by the application.

----

More about ARTIK cloud services
---------------

If you are not familiar with ARTIK cloud services, we have extensive documentation at https://developer.artik.cloud/documentation

The full ARTIK cloud services API specification can be found at https://developer.artik.cloud/documentation/api-reference/

Check out advanced sample applications at https://developer.artik.cloud/documentation/tutorials/code-samples/

To create and manage your services and devices on ARTIK cloud services, visit the Developer Dashboard at https://developer.artik.cloud

License and Copyright
---------------------

Licensed under the Apache License. See [LICENSE](LICENSE).

Copyright (c) 2018 Samsung Electronics Co., Ltd.
