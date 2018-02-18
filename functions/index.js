// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').ApiAiApp;
const functions = require('firebase-functions');

// const NAME_ACTION = 'make_name';
const LIGHT_ACTION = 'light_control';
// const COLOR_ARGUMENT = 'color';
const CATEGORY_ARGUMENT = 'category';
// const NUMBER_ARGUMENT = 'number';
const ACTION_ARGUMENT = 'action';



exports.myoData = functions.https.onRequest((request, response) => {
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));
  response.send("hi");
});

var commandstr = '';

// [START SillyNameMaker]
exports.arGoogleHome = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  function controlLight (app) {
    let category = app.getArgument(CATEGORY_ARGUMENT);
    let action = app.getArgument(ACTION_ARGUMENT);
    var actionvar = 0;
    var val_change_0 = 20;
    var val_change_1 = 80;
    if (action == "off"){
      console.log('off');
      actionvar = 0;
    }else if (action == "on"){
      console.log('on');
      actionvar = 100;
    }else if (action == "change"){
      console.log('change');
      actionvar = 50;
    }

    if (category == "Living Room"){
      console.log('Living Room');
      commandstr = '#OUTPUT,12,1,'+actionvar+'\r\n'+'#OUTPUT,13,1,'+actionvar+'\r\n';
      console.log(commandstr);
    }else if (category == "Kitchen"){
      console.log('Kitchen');
      commandstr = '#OUTPUT,14,1,'+actionvar+'\r\n'+'#OUTPUT,16,1,'+actionvar+'\r\n';
      console.log(commandstr);
    }else if (category == "Bedroom"){
      console.log('Bedroom');
      commandstr = '#OUTPUT,15,1,'+actionvar+'\r\n';
      console.log(commandstr);

    }else if (category == "Bathroom"){
      console.log('Bathroom');
      commandstr = '#OUTPUT,17,1,'+actionvar+'\r\n';
      console.log(commandstr);
    }
    app.tell('The light in ' +
      category + ' is now ' + action);
  }


  let actionMap = new Map();
  // actionMap.set(NAME_ACTION, makeName);
  actionMap.set(LIGHT_ACTION, controlLight);
  

  app.handleRequest(actionMap);
  console.log("response", commandstr);
  response.send(commandstr);

});
// [END SillyNameMaker]



exports.command = functions.https.onRequest((request, response) => {
  console.log("response", commandstr);
  // response.send(commandstr);
  response.send('#OUTPUT,14,1,100');

});



const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 1234 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

 ws.send('something');
});
