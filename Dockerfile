FROM public.ecr.aws/docker/library/node:20 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --quiet
COPY . .
RUN npm run prisma:generate
RUN npm run build

FROM public.ecr.aws/docker/library/node:20 AS production
WORKDIR /usr/src/app
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 3000
CMD npm run start:prod
