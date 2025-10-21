FROM node:25-alpine

# Run as a non-privileged user
RUN mkdir -p /usr/src/app && chown node:node /usr/src/app
USER node
WORKDIR /usr/src/app

# Install dependencies
COPY --chown=node:node package*.json ./
RUN npm ci

# Copy source files into application directory
COPY --chown=node:node . /usr/src/app

EXPOSE 3000

# Run the app
CMD ["npm", "start"]