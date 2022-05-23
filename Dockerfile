FROM ubuntu:latest

ENV SSH_PASSWD "root:Docker!"
RUN apt-get update \
        && apt-get install -y --no-install-recommends apt-utils dialog openssh-server \
	&& echo "$SSH_PASSWD" | chpasswd 

COPY sshd_config /etc/ssh/
COPY init.sh /usr/local/bin/
RUN chmod 755 /usr/local/bin/init.sh


CMD ["/usr/sbin/sshd","-D"]

FROM node:12

RUN mkdir /app

WORKDIR /app

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -

RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

COPY package.json /app

COPY . /app

RUN yarn install

RUN yarn run build

COPY . /app
RUN chmod 755 /app/init.sh
EXPOSE 8080 2222

# CMD ["npm","run","start"]
ENTRYPOINT ["/app/init.sh"]