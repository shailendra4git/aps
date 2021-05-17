FROM quay.io/gatblau/node:12-ubi8-min
WORKDIR /usr/src/apsedge
COPY . .
RUN npm install
EXPOSE 3000
USER 20
CMD [ "npm", "start" ]