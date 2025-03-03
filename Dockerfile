
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
# Gunakan Node.js Alpine sebagai base image
FROM node:alpine

# Tetapkan direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json (jika ada) ke dalam container
COPY package.json .

# Install dependensi tanpa membuat package-lock.json
RUN npm install --no-package-lock

# Salin seluruh file proyek ke dalam container
COPY . .

# Buka port 3000 untuk aplikasi
EXPOSE 3000

# Jalankan aplikasi saat container dimulai
CMD ["node", "app.js"]

