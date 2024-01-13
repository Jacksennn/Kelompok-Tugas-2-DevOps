### STEPS
# Build docker images
docker-compose down && docker-compose build
# run registry server
docker-compose up -d registry 
# Tag and push to local registry server
docker tag frontend:latest localhost:5000/frontend:latest 
docker push localhost:5000/frontend:latest 
docker tag backend:latest localhost:5000/backend:latest 
docker push localhost:5000/backend:latest

# start frontend deployment
kubectl apply -f frontend/frontend-deployment.yaml
# delete frontend deployment
kubectl delete deployment/frontend-deployment

# start database deployment
kubectl apply -f backend/database-deployment.yaml
# delete database deployment
kubectl delete deployment/database-deployment

# start backend deployment
kubectl apply -f backend/backend-deployment.yaml
# delete backend deployment
kubectl delete deployment/backend-deployment

# Monitor pods
kubectl get pods -w

# Monitor deployment
kubectl get deployment -w

# Start backend horizontal pod autoscaler
kubectl apply -f backend/backend-hpa.yaml

# Monitor HPA
kubectl get hpa -w

# Run this to stress test backend service
kubectl run -i --tty load-generator-1 --rm --image=busybox:1.28 --restart=Never --namespace=ingress-nginx -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://backend-service/activity-groups; done"

# Delete unused container
docker container prune -f

# Delete dangling images
docker rmi $(docker images -f "dangling=true" -q)