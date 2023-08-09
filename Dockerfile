FROM node:lts

# Definindo o diretório de trabalho
WORKDIR /home/mksolutions/app

# Criando os diretórios e ajustando permissões
RUN mkdir -p /home/mksolutions/app/node_modules && chown -R ${user}:${user} /home/mksolutions/app

# Instale o Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
  && apt-get update \
  && apt-get install -y yarn

# Mudando para o usuário definido
USER ${user}


# Copiando os arquivos de dependências
COPY package.json yarn.* ./

# Instalando as dependências
RUN yarn

# Copiando o restante do código
COPY . .

# Expondo a porta
EXPOSE 3333

# Compartilhando a pasta node_modules entre o host e o contêiner
VOLUME ["/home/mksolutions/app/node_modules"]

# Comando para executar a aplicação
CMD ["yarn", "dev"]
