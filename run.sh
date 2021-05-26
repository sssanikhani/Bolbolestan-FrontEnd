#!/bin/bash

project_name="bolbolestan-front"
project_image_name="bolbolestan-front:latest"

docker build -t $project_image_name .

[[ $(docker ps -f "name=$project_name" --format '{{.Names}}') == $project_name ]] || 
docker run --name $project_name -p 3000:3000 -it $project_image_name

docker start $project_name
