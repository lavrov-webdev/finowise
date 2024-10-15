#!/bin/sh

# Устанавливаем значение по умолчанию для порта, если переменная PORT не установлена
export PORT=${PORT:-80}

# Выполняем подстановку переменной окружения PORT
envsubst '${PORT}' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/nginx.conf

# Запускаем nginx
nginx -g 'daemon off;'