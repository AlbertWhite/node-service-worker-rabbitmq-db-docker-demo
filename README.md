### What

A micro service emit an event though rabbitmq, the worker will read this message from the same channel, and save data from this event into a db.

### How

Docker-compose to start the rabbitmq, postgre, event producer in node server, event consumer. The event consumer will connnect to the same queue and insert data into database.

### Future Improvement:

- Use config package
- Implement make file
- Implement a graphql api
- Split the project into multiple src
- Implement a frontend with nextjs, to send message from front to backend, then emit the event
- Implement cucumber test for the graphql api
