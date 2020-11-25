FROM node
WORKDIR /code
EXPOSE 3333
COPY . .
CMD ["npm", "dev:server"]
