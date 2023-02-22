# transcribe-api
API for handling queries to transcribe database and creating jobs on the transcriber worker.

# Auth in database using docker
```bash
sudo docker exec -it <CONTAINER_ID> mongosh admin -u admin -p 'admin' --authenticationDatabase admin
```