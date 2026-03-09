# FROM node:20-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# ARG VITE_API_URL
# ENV VITE_API_URL=$VITE_API_URL
# EXPOSE 3000
# CMD ["npm", "run", "dev"]

# build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL=/api/notes
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# run stage
FROM node:20-alpine
WORKDIR /app
RUN npm i -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]