# node-service-worker-rabbitmq-db-docker-demo

Service emit event to worker throught rabbitmq and save data into db

1. Set up an express server done
2. Set up docker to launch that express server done
3. Set up rabbitmq with docker
4. Send an event from the server
5. Set up the event listener from the worker with docker
6. Set up db with docker
   6.5 start the migration for each run
7. Consume the message and write into a db

Improvement:
config package
make
depending in docker-compose
create a method
add cucumber test
