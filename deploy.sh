docker build -t emreturgut/complex-client:latest -t emreturgutce/complex-client:$SHA -f ./client/Dockerfile ./client
docker build -t emreturgut/complex-server:latest -t emreturgutce/complex-server:$SHA -f ./server/Dockerfile ./server
docker build -t emreturgut/complex-worker:latest -t emreturgutce/complex-worker:$SHA -f ./worker/Dockerfile ./worker

docker push emreturgut/complex-client:latest
docker push emreturgut/complex-server:latest
docker push emreturgut/complex-worker:latest

docker push emreturgut/complex-client:$SHA
docker push emreturgut/complex-server:$SHA
docker push emreturgut/complex-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployments server=emreturgutce/complex-server:$SHA
kubectl set image deployments/client-depl client=emreturgutce/complex-client:$SHA
kubectl set image deployments/worker-depl worker=emreturgutce/complex-worker:$SHA
