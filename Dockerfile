FROM node:9-slim
WORKDIR /app
COPY . /app
CMD ["npm", "run", "develop-docker"]