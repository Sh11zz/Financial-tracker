# Financial-tracker
### Веб-приложение для учета личных финансов
Пользователь фиксирует доходы и расходы, а система считает баланс.

## Стек
* Frontend: React + Vite
* Backend: Flask + Gunicorn
* Database: PostgreSQL
* Веб-сервер: Caddy (раздаёт фронтенд, проксирует `/api` на бэкенд, автоматический HTTPS)

## Участники
* Артём Клепиков https://github.com/Sh11zz
* Валентин Соловьев https://github.com/Ariyame
* Мухамед Хураяев https://github.com/Moorfin

---

## Деплой на VPS

Нужны Docker с Compose plugin и (для HTTPS) домен, A-запись которого указывает на IP сервера. Порты 80 и 443 должны быть открыты.

```bash
git clone https://github.com/Sh11zz/Financial-tracker.git
cd Financial-tracker
cp .env.example .env
```

Заполнить `.env`:
* `SITE_ADDRESS` — домен, например `fintrack.example.com`. Caddy сам получит сертификат Let's Encrypt. Если оставить пустым, сайт будет доступен по HTTP на порту 80.

Запуск:
```bash
docker compose up -d --build
```

Таблицы в БД создаются автоматически при старте бэкенда.

### Полезные команды
```bash
docker compose logs -f backend   # логи бэкенда
git pull && docker compose up -d --build   # обновление
docker compose down              # остановить (данные сохраняются)
```

### Бэкап базы
```bash
docker compose exec -T db pg_dump -U postgres fintrack > backup.sql
```

---

## Локальная разработка

Самый простой способ — тот же `docker compose up --build`, сайт будет на http://localhost.

Без Docker (нужен локальный PostgreSQL):
```bash
./setup.sh
```
Скрипт создаст `.venv`, поставит зависимости и выведет команды для запуска бэкенда (порт 8000) и фронтенда (`npm run dev`). Vite проксирует `/api` на бэкенд так же, как Caddy в продакшене.
