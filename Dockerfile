FROM node:lts AS base
WORKDIR /app

COPY package.json package-lock.json ./
COPY schema.zmodel ./
COPY prisma/schema ./prisma/schema

FROM base AS prod-deps
RUN npm install --omit=dev -f

FROM base AS build-deps
RUN npm install -f

FROM build-deps AS build
ENV DOCKER=true
ENV DATABASE_URL="string"
ENV AUTH_GOOGLE_SECRET="string"
ENV AUTH_GOOGLE_ID="string"
ENV AUTH_SECRET="012345678901234567890123456789012"
ENV AUTH_TRUST_HOST=true
ENV GEMINI_API_KEY="string"
ENV GROQ_API_KEY="string"
ENV PDF_SERVICES_CLIENT_ID="string"
ENV PDF_SERVICES_CLIENT_SECRET="string"
ENV UPLOADTHING_TOKEN="string"

COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node ./dist/server/entry.mjs