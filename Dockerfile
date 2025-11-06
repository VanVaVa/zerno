# Базовый образ
FROM node:18-alpine

# Установи рабочую директорию
WORKDIR /app

# Скопируй package.json и package-lock.json
COPY package*.json ./

# Установи зависимости
RUN npm install

# Скопируй весь проект
COPY . .

# Собери приложение
RUN npm run build

# Укажи порт
EXPOSE 3000

# Запусти приложение
CMD ["npm", "start"]