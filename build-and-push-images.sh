cd ./ && docker-compose down && docker-compose build \
&& docker-compose up -d registry \
&& docker tag frontend:latest localhost:5000/frontend:latest \
&& docker push localhost:5000/frontend:latest \
&& docker tag backend:latest localhost:5000/backend:latest \
&& docker push localhost:5000/backend:latest