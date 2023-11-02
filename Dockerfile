# Resmi Node.js imajını kullanın
FROM node:18.16.0

# Uygulama dizinini oluşturun
WORKDIR /usr/src/app

# Proje dosyalarını konteynere kopyalayın
COPY . .

# Bağımlılıkları yükleyin
RUN npm install

# Uygulamayı başlatın
CMD ["npm", "start"]
