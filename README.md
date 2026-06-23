# Financial-tracker
### Веб-приложение для учета личных финансов
Пользователь фиксирует доходы и расходы, управляет счетами и категориями.

## Стек
* Frontend: React
* Backend: Flask, Django
* Database: SQLite3
---
## Список Участников
* Артём Клепиков https://github.com/Sh11zz
* Валентин Соловьев https://github.com/Ariyame
* Мухамед Хураяев https://github.com/Moorfin

---
## Инструкция по setup.sh

1. Запустить его в git bash 
```
git clone https://github.com/Sh11zz/Financial-tracker.git
cd Financial-tracker
./setup.sh
```
>Либо просто запустить в пайчарме (он такое позволяет). Насчет остальных IDE хз

2. Если выводит `permission denied`
```
chmod +x setup.sh
./setup.sh
```

3. после вывода `Все готово. Здоровья погибшим` вставить команды

 ```
 source .venv/bin/activate
 cd backend
 pyhon app.py
 ```
 >Запускает бэкенд

 ```
cd frontend
npm run dev
 ```
>Запускает фронтенд
