'use strict';

//ローカル環境ファイル
const File = require('fs');

const request = require('request');

const BASE_URL = 'https://faceapi-makerclubtest.cognitiveservices.azure.com/face/v1.0/';
const Subscription_key = '19d35325ca0141a4a55d7327e201b0b2';
const GROUP_NAME = 'hogehoge';


function AddFace(personId,imageurl){

    //ファイルの確認
    if (File.statSync(imageurl)){
        //console.log(imageurl);
    }

    //ファイル変換
    var Img_base64_data = "";
    File.readFile( imageurl, function( err, content ) {
        if( err ) {
          console.error(err);
        }
        else {
          /* Base64変換 */
          Img_base64_data = "Buffer " + content.toString( 'base64' );
          //Img_binary = new Buffer(imageurl, 'binary');
          console.log(Img_base64_data);
        }
        });


    //endpoint作成
    //const endpoint = BASE_URL + 'persongroups/'; 
    const endpoint = "https://faceapi-makerclubtest.cognitiveservices.azure.com/face/v1.0/persongroups/hogehoge/persons";
    //option定義
    var options = {
        uri: endpoint,
        method: 'POST',
        param: { 
            "personGroupId": GROUP_NAME,
            "personId": personId

        },
        headers : {
            //#'Content-Type': APIに送るメディアのタイプ. 
            //'application/json'(URL指定の場合), 
            //'application/octet-stream' (Local ファイル転送の場合)
            'Content-Type':'application/octet-stream',
            'Ocp-Apim-Subscription-Key' : Subscription_key
        },
        body :JSON.stringify({
            Img_base64_data
        })
        //json: true
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

//ikutatoma ID
AddFace("3e27bc65-f658-42b3-bbe3-6c00fd7","C:\\Users\\haoshita\\Desktop\\makerclub\\MKC-Hackday-2019\\Hackday-2019\\ikutatoma01.jpg");

