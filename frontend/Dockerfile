FROM node:16-alpine AS dependencies
WORKDIR /app
COPY package.json .
COPY yarn.lock .
# RUN yarn add uuid
RUN yarn install --frozen-lockfile
# RUN npm install -g @angular/cli

FROM dependencies as builder
COPY . .
RUN yarn run build

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/
COPY --from=builder /app/dist/vuexy /usr/share/nginx/html
EXPOSE 80
# COPY --chown=node:node . .