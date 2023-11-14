# Use a imagem oficial do Node.js 18
FROM node:18

# Define o diretório de trabalho no contêiner como o diretório atual do Dockerfile
WORKDIR /

# Copia os arquivos necessários para o contêiner
COPY package*.json ./
COPY public/ ./public
COPY src/ ./src
COPY server/ ./server

# Instala as dependências do projeto
RUN npm install
# Expõe a porta 3000 (ou a porta que o aplicativo React está configurado para usar)
EXPOSE 400

# Comando para iniciar o aplicativo quando o contêiner for iniciado
CMD ["npm", "start"]