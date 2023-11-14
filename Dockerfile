# Use uma imagem base com Node.js
FROM node:18

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie os arquivos do aplicativo para o diretório de trabalho
COPY . .

# Construa o aplicativo React
RUN npm run build

# Exponha a porta 3000, que é a porta padrão para aplicativos React
EXPOSE 3000

# Comando para iniciar o aplicativo quando o contêiner for executado
CMD ["npm", "start"]
