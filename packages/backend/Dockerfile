# This dockerfile builds an image for the backend package.
# It should be executed with the root of the repo as docker context.
#
# Before building this image, be sure to have run the following commands in the repo root:
#
# yarn install
# yarn tsc
# yarn build:backend
#
# Once the commands have been run, you can build the image using `yarn build-image`

FROM node:18.19.1-bullseye-slim

# Install sqlite3 dependencies. You can skip this if you don't use sqlite3 in the image,
# in which case you should also move better-sqlite3 to "devDependencies" in package.json.
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update && \
    apt-get install -y --no-install-recommends libsqlite3-dev python3 build-essential && \
    yarn config set python /usr/bin/python3

# From here on we use the least-privileged `node` user to run the backend.
USER node

# This should create the app dir as `node`.
# If it is instead created as `root` then the `tar` command below will fail: `can't create directory 'packages/': Permission denied`.
# If this occurs, then ensure BuildKit is enabled (`DOCKER_BUILDKIT=1`) so the app dir is correctly created as `node`.
WORKDIR /app

# This switches many Node.js dependencies to production mode.
ENV NODE_ENV production

ARG TFB_APP_ID
ARG TFB_APP_WEBHOOKURL
ARG TFB_APP_CLIENT_ID
ARG TFB_APP_CLIENT_SECRET
ARG TFB_APP_WEBHOOK_SECRET
ARG TFB_APP_PRIVATE_KEY_0
ARG TFB_APP_PRIVATE_KEY_1
ARG TFB_APP_PRIVATE_KEY_2
ARG TFB_APP_PRIVATE_KEY_3
ARG TFB_APP_PRIVATE_KEY_4
ARG TFB_APP_PRIVATE_KEY_5
ARG TFB_APP_PRIVATE_KEY_6
ARG TFB_APP_PRIVATE_KEY_7
ARG TFB_APP_PRIVATE_KEY_8
ARG TFB_APP_PRIVATE_KEY_9
ARG TFB_APP_PRIVATE_KEY_10
ARG TFB_APP_PRIVATE_KEY_11
ARG TFB_APP_PRIVATE_KEY_12
ARG TFB_APP_PRIVATE_KEY_13
ARG TFB_APP_PRIVATE_KEY_14
ARG TFB_APP_PRIVATE_KEY_15
ARG TFB_APP_PRIVATE_KEY_16
ARG TFB_APP_PRIVATE_KEY_17
ARG TFB_APP_PRIVATE_KEY_18
ARG TFB_APP_PRIVATE_KEY_19
ARG TFB_APP_PRIVATE_KEY_20
ARG TFB_APP_PRIVATE_KEY_21
ARG TFB_APP_PRIVATE_KEY_22
ARG TFB_APP_PRIVATE_KEY_23
ARG TFB_APP_PRIVATE_KEY_24

ARG AUTH_GITHUB_CLIENT_ID
ARG AUTH_GITHUB_CLIENT_SECRET
ARG LOCAL_AUTH_GITHUB_CLIENT_ID
ARG LOCAL_AUTH_GITHUB_CLIENT_SECRET

ARG POSTGRES_HOST
ARG POSTGRES_USER
ARG POSTGRES_PORT
ARG POSTGRES_PASSWORD

ARG BAC_BOT_TOKEN
ARG BACKEND_SECRET

# # Set the environment variables during the build process
ENV BAC_BOT_TOKEN=$BAC_BOT_TOKEN
ENV BACKEND_SECRET=$BACKEND_SECRET
ENV POSTGRES_HOST=$POSTGRES_HOST
ENV POSTGRES_USER=$POSTGRES_USER
ENV POSTGRES_PORT=$POSTGRES_PORT
ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD

ENV AUTH_GITHUB_CLIENT_ID=$AUTH_GITHUB_CLIENT_ID
ENV AUTH_GITHUB_CLIENT_SECRET=$AUTH_GITHUB_CLIENT_SECRET
ENV LOCAL_AUTH_GITHUB_CLIENT_ID=$LOCAL_AUTH_GITHUB_CLIENT_ID
ENV LOCAL_AUTH_GITHUB_CLIENT_SECRET=$LOCAL_AUTH_GITHUB_CLIENT_SECRET

ENV TFB_APP_ID=$TFB_APP_ID
ENV TFB_APP_WEBHOOKURL=$TFB_APP_WEBHOOKURL
ENV TFB_APP_CLIENT_ID=$TFB_APP_CLIENT_ID
ENV TFB_APP_CLIENT_SECRET=$TFB_APP_CLIENT_SECRET
ENV TFB_APP_WEBHOOK_SECRET=$TFB_APP_WEBHOOK_SECRET
ENV TFB_APP_PRIVATE_KEY_0=$TFB_APP_PRIVATE_KEY_0
ENV TFB_APP_PRIVATE_KEY_1=$TFB_APP_PRIVATE_KEY_1
ENV TFB_APP_PRIVATE_KEY_2=$TFB_APP_PRIVATE_KEY_2
ENV TFB_APP_PRIVATE_KEY_3=$TFB_APP_PRIVATE_KEY_3
ENV TFB_APP_PRIVATE_KEY_4=$TFB_APP_PRIVATE_KEY_4
ENV TFB_APP_PRIVATE_KEY_5=$TFB_APP_PRIVATE_KEY_5
ENV TFB_APP_PRIVATE_KEY_6=$TFB_APP_PRIVATE_KEY_6
ENV TFB_APP_PRIVATE_KEY_7=$TFB_APP_PRIVATE_KEY_7
ENV TFB_APP_PRIVATE_KEY_8=$TFB_APP_PRIVATE_KEY_8
ENV TFB_APP_PRIVATE_KEY_9=$TFB_APP_PRIVATE_KEY_9
ENV TFB_APP_PRIVATE_KEY_10=$TFB_APP_PRIVATE_KEY_10
ENV TFB_APP_PRIVATE_KEY_11=$TFB_APP_PRIVATE_KEY_11
ENV TFB_APP_PRIVATE_KEY_12=$TFB_APP_PRIVATE_KEY_12
ENV TFB_APP_PRIVATE_KEY_13=$TFB_APP_PRIVATE_KEY_13
ENV TFB_APP_PRIVATE_KEY_14=$TFB_APP_PRIVATE_KEY_14
ENV TFB_APP_PRIVATE_KEY_15=$TFB_APP_PRIVATE_KEY_15
ENV TFB_APP_PRIVATE_KEY_16=$TFB_APP_PRIVATE_KEY_16
ENV TFB_APP_PRIVATE_KEY_17=$TFB_APP_PRIVATE_KEY_17
ENV TFB_APP_PRIVATE_KEY_18=$TFB_APP_PRIVATE_KEY_18
ENV TFB_APP_PRIVATE_KEY_19=$TFB_APP_PRIVATE_KEY_19
ENV TFB_APP_PRIVATE_KEY_20=$TFB_APP_PRIVATE_KEY_20
ENV TFB_APP_PRIVATE_KEY_21=$TFB_APP_PRIVATE_KEY_21
ENV TFB_APP_PRIVATE_KEY_22=$TFB_APP_PRIVATE_KEY_22
ENV TFB_APP_PRIVATE_KEY_23=$TFB_APP_PRIVATE_KEY_23
ENV TFB_APP_PRIVATE_KEY_24=$TFB_APP_PRIVATE_KEY_24

# Copy repo skeleton first, to avoid unnecessary docker cache invalidation.
# The skeleton contains the package.json of each package in the monorepo,
# and along with yarn.lock and the root package.json, that's enough to run yarn install.
COPY --chown=node:node yarn.lock package.json packages/backend/dist/skeleton.tar.gz ./
RUN tar xzf skeleton.tar.gz && rm skeleton.tar.gz

RUN --mount=type=cache,target=/home/node/.cache/yarn,sharing=locked,uid=1000,gid=1000 \
    yarn install --frozen-lockfile --production --network-timeout 300000

# Then copy the rest of the backend bundle, along with any other files we might want.
COPY --chown=node:node packages/backend/dist/bundle.tar.gz app-config*.yaml github-app-tfb-backstage-credentials.yaml ./
RUN tar xzf bundle.tar.gz && rm bundle.tar.gz

CMD ["node", "packages/backend", "--config", "app-config.yaml", "--config", "app-config.production.yaml"]
