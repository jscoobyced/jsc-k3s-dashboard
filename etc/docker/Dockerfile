FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
ARG GIT_TAG
ENV GIT_TAG ${GIT_TAG}


COPY --from=deps /app/node_modules ./node_modules
COPY app app
COPY styles styles
COPY public public
COPY services services
COPY repositories repositories
COPY *.json *.js *.ts ./
RUN yarn build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

ARG USERID=1001
ARG GROUPID=1001
ENV USERID ${USERID}
ENV GROUPID ${GROUPID}

RUN addgroup -g ${GROUPID} -S nodejs
RUN adduser -S nextjs -u ${USERID}

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN mkdir /data && chown -R nextjs:nodejs /data

USER nextjs

EXPOSE 3000

ENV PORT 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node", "server.js"]