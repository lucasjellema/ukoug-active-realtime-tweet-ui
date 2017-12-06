var Twit = require('twit');
const express = require('express');
const app = express();

const { twitterconfig } = require('./twitterconfig');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

var T = new Twit({
  consumer_key: twitterconfig.consumer_key,
  consumer_secret: twitterconfig.consumer_secret,
  access_token: twitterconfig.access_token_key,
  access_token_secret: twitterconfig.access_token_secret,
  timeout_ms: 60 * 1000,
});


var hashtag = "ukoug17";
var tracks = { track: ['ukoug17','ukoug2017', 'ukoug_apps17', 'ukoug_tech17','ukoug_jde17'] };
let tweetStream = T.stream('statuses/filter', tracks)
tweetstream(tracks, tweetStream);

function tweetstream(hashtags, tweetStream) {
  //  tweetStream.stop();
  // tweetStream = T.stream('statuses/filter', { track:   hashtags });
  console.log("Started tweet stream for hashtag #" + JSON.stringify(hashtags));

  tweetStream.on('connected', function (response) {
    console.log("Stream connected to twitter for #" + JSON.stringify(hashtags));
  })
  tweetStream.on('error', function (error) {
    console.log("Error in Stream for #" + JSON.stringify(hashtags) + " " + error);
  })
  tweetStream.on('tweet', function (tweet) {
    processTweetEvent(tweet,hashtags);
  });
}

const kafka = require('kafka-node');

var EVENT_HUB_PUBLIC_IP = '192.168.188.102';
var TOPIC_NAME = 'tweetsTopic';
var ZOOKEEPER_PORT = 2181;

var Producer = kafka.Producer;
var client = new kafka.Client(EVENT_HUB_PUBLIC_IP + ':' + ZOOKEEPER_PORT);
var producer = new Producer(client);

let payloads = [
  { topic: TOPIC_NAME, messages: '*', partition: 0 }
];

function processTweetEvent(tweet,hashtags) {
      // find out which of the original hashtags { track: ['ukoug17','ukoug2017', 'ukoug_apps17', 'ukoug_tech17','ukoug_jde17'] } in the hashtags for this tweet; 
    //that is the one for the tagFilter property
    // select one other hashtag from tweet.entities.hashtags to set in property hashtag; if there is none, the default will used
    var tagFilter="ukoug17";
    var extraHashTag="UK Oracle User Group";
    for (var i = 0; i < tweet.entities.hashtags.length; i++) {
      var tag = tweet.entities.hashtags[i].text.toLowerCase();
      console.log("inspect hashtag "+tag);
      var idx = hashtags.track.indexOf(tag);
      if (idx > -1) {
        tagFilter = tag;
      } else {
        extraHashTag = tag
      }
    }//for


    var tweetEvent = {
      "eventType": "tweetEvent"
      , "text": tweet.text
      , "isARetweet": tweet.retweeted_status ? "y" : "n"
      , "author": tweet.user.name
      , "hashtag": extraHashTag
      , "createdAt": tweet.created_at
      , "language": tweet.lang
      , "tweetId": tweet.id
      , "tagFilter": tagFilter
      , "originalTweetId": tweet.retweeted_status ? tweet.retweeted_status.id : null
    };
    KeyedMessage = kafka.KeyedMessage,
      tweetKM = new KeyedMessage(tweetEvent.id, JSON.stringify(tweetEvent)),
      payloads[0].messages = tweetKM;

      console.log("Tweet: "+tweet.text)
    producer.send(payloads, function (err, data) {
      if (err) {
        console.error(err);
      }
      console.log(data);
    });
}