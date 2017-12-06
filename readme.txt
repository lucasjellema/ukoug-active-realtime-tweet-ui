run Kafka locally using 
C:\data\a_ukoug2017\KafkaAndWhyIsItImportant_UIPush\real-time-ui-with-kafka-streams\docker-kafka

in C:\data\a_ukoug2017\KafkaAndWhyIsItImportant_UIPush\real-time-ui-with-kafka-streams\generate-tweet-events
run
node index.js



in C:\data\a_ukoug2017\KafkaAndWhyIsItImportant_UIPush\real-time-ui-with-kafka-streams\consume-twitter
run
node index.js

in C:\data\a_ukoug2017\KafkaAndWhyIsItImportant_UIPush\real-time-ui-with-kafka-streams\Kafka-Streams-Tweets-Analyzer
run
java -cp target/Kafka-Streams-Tweets-Analyzer-1.0-SNAPSHOT.jar;target/dependency/* nl.amis.streams.tweets.App



in C:\data\a_ukoug2017\KafkaAndWhyIsItImportant_UIPush\real-time-ui-with-kafka-streams\Kafka-Streams-TweetLikes-Analyzer
run
java -cp target/Kafka-Streams-TweetLikes-Analyzer-1.0-SNAPSHOT.jar;target/dependency/* nl.amis.streams.tweets.App



in C:\data\a_ukoug2017\KafkaAndWhyIsItImportant_UIPush\real-time-ui-with-kafka-streams\web-app
run
node app.js

open Web Application in local browser:

http://127.0.0.1:8123
