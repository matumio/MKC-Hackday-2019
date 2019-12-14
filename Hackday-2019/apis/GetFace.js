'use strict';

const request = require('request');

const BASE_URL = 'https://faceapi-makerclubtest.cognitiveservices.azure.com/face/v1.0/';
const Subscription_key = '19d35325ca0141a4a55d7327e201b0b2';
const GROUP_NAME = 'hogehoge';

function GetPersonGroup(){
    //endpoint作成
    const endpoint = BASE_URL + 'persongroups/'; 
    //option定義
    var options = {
        uri: endpoint,
        method: 'GET',
        param: { 
            "personGroupId": GROUP_NAME
        },
        headers : {
            'Ocp-Apim-Subscription-Key' : Subscription_key
        },
        
    }

    request(options,function(error, response, body){
        if (error) {
            console.log('Error: ', error);
            return;
          }            
          let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
          console.log('JSON Response\n');
          console.log(jsonResponse);
    });
}
GetPersonGroup();

