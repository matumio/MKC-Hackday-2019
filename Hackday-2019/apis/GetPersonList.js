'use strict';

const request = require('request');

const BASE_URL = 'https://faceapi-makerclubtest.cognitiveservices.azure.com/face/v1.0/';
const Subscription_key = '19d35325ca0141a4a55d7327e201b0b2';
const GROUP_NAME = 'hogehoge';

//すべてのperson取得
function GetPersonList(){
    //endpoint作成
    const endpoint = "https://faceapi-makerclubtest.cognitiveservices.azure.com/face/v1.0/persongroups/hogehoge/persons?start=0&top=1000"; 
    //option定義
    var options = {
        uri: endpoint,
        method: 'GET',
        param: { 
            "personGroupId": GROUP_NAME,
            "start": 1,
            "top": 1000
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

GetPersonList();
