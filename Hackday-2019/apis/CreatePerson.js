'use strict';

const request = require('request');

const BASE_URL = 'https://faceapi-makerclubtest.cognitiveservices.azure.com/face/v1.0/';
const Subscription_key = '19d35325ca0141a4a55d7327e201b0b2';
const GROUP_NAME = 'hogehoge';

//ユーザ作成
function CreatePerson(personname){
    //endpoint作成
    //const endpoint = BASE_URL + 'persongroups/' + GROUP_NAME + + '/persons'; 
    const endpoint="https://faceapi-makerclubtest.cognitiveservices.azure.com/face/v1.0/persongroups/hogehoge/persons";

    //option定義
    var options = {
        uri: endpoint,
        method: 'POST',
        headers : {

            'Ocp-Apim-Subscription-Key' : Subscription_key
        },
        body:JSON.stringify({
            "name": personname
        })
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

//CreatePerson("ikutatoma");
//CreatePerson("testtest");
//CreatePerson("sudamasaki");
