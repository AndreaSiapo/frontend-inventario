FROM node:20

WORKDIR /app

# Copiamos package.json si existe (al principio no existirá, no pasa nada)
COPY package.json package-lock.json* ./

# Instalamos dependencias solo si el proyecto ya fue creado
RUN if [ -f package.json ]; then npm install; fi

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
