# Financial-tracker
### Веб-приложение для учета личных финансов
Пользователь фиксирует доходы и расходы, а система считает баланс.

> ⚠️ **Учебный стенд с намеренными уязвимостями.** Не используйте настоящие пароли.
> 1. Пароли хранятся в БД открытым текстом (A02)
> 2. «Вход» — это `user_id` в localStorage, сервер не проверяет, кто обращается к данным (A01)
> 3. `GET /api/user/<id>` возвращает пароль пользователя (A01/A02)
> 4. Пароль БД и JWT-ключ захардкожены в коде и есть в истории git (A05)
> 5. Сервер возвращает клиенту текст ошибок БД и traceback (A05)

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
