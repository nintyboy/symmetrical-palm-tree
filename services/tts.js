/*-------------------
REQUIRES
-------------------*/

const keys = require('../config/keys');
const speech = require('@google-cloud/text-to-speech');
const fs = require('fs');

/*-------------------
GLOBALS
-------------------*/

const client = new speech.TextToSpeechClient({
    // keyFilename: './config/config.js'
    project_id : keys.GOOGLE_CLOUD_SPEECH.project_id,
    credentials : {
      private_key : keys.GOOGLE_CLOUD_SPEECH.private_key.replace(/\\n/g, '\n'),
      client_email : keys.GOOGLE_CLOUD_SPEECH.client_email
    }
});

/*-------------------
MODULES
-------------------*/

module.exports = {
  makeMP3 : async (data) => {
    console.time('makeMP3');

    const outputFile = 'temp/'+data.title.replace(/\s+/g, '-')+'.mp3';

    const request = {
      input : {
        text : data.content
      },
      voice : {
        name : 'en-US-Wavenet-E',
        languageCode : 'en-US',
        ssmlGender: 'FEMALE'
      },
      audioConfig : {
        speakingRate : '1.11',
        audioEncoding : 'MP3'
      },
    };

    var promise =  new Promise((resolve,reject) => {
      console.log("async Start");
      client.synthesizeSpeech(request, (err, response) => {
        if(err){
          console.error('SYNTHESIZESPEECH ERROR: ',err);
          // process.exit();
          return;

        }
        fs.writeFile(outputFile, response.audioContent, 'binary', err => {
          if(err){
            console.log("WRITEFILE ERR: ", err);
            process.exit();
          }
          fs.exists(outputFile, (exists) => {
            if(exists){
              console.timeEnd('makeMP3');
              resolve(outputFile);
            }
          });
        })
      });
    })

    return promise;

  }
}
