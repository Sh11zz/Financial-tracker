import sqlite3
from datetime import datetime, timedelta

DB_PATH = 'finance.db'

def create_tables():
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        # Таблица пользователей
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                balance REAL DEFAULT 0
            )
        ''')
        # Таблица категорий
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                type TEXT CHECK(type IN ('expense', 'income')),
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        ''')
        # Таблица расходов
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS expenses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                sum REAL NOT NULL,
                category TEXT NOT NULL,
                date_time TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        ''')
        # Таблица доходов
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS income (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                sum REAL NOT NULL,
                date_time TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        ''')

def add_user(username, email, password, initial_balance=0):
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO users (username, email, password, balance)
            VALUES (?, ?, ?, ?)
        ''', (username, email, password, initial_balance))
        return cursor.lastrowid

def add_category(user_id, name, type_):
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO categories (user_id, name, type)
            VALUES (?, ?, ?)
        ''', (user_id, name, type_))

def add_expense(user_id, sum, category_name):
    date_time_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        # Обновляем баланс
        cursor.execute('UPDATE users SET balance = balance - ? WHERE id = ?', (sum, user_id))
        # Вносим расход
        cursor.execute('''
            INSERT INTO expenses (user_id, sum, category, date_time)
            VALUES (?, ?, ?, ?)
        ''', (user_id, sum, category_name, date_time_str))

def add_income(user_id, sum):
    date_time_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        # Обновляем баланс
        cursor.execute('UPDATE users SET balance = balance + ? WHERE id = ?', (sum, user_id))
        # Вносим доход
        cursor.execute('''
            INSERT INTO income (user_id, sum, date_time)
            VALUES (?, ?, ?)
        ''', (user_id, sum, date_time_str))

def get_user_balance(user_id):
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT balance FROM users WHERE id = ?', (user_id,))
        result = cursor.fetchone()
        return result[0] if result else None

def get_statistics(user_id, period='month', category=None):
    now = datetime.now()
    if period == 'week':
        start_date = now - timedelta(weeks=1)
    elif period == 'month':
        start_date = now.replace(day=1)
    elif period == 'year':
        start_date = now.replace(month=1, day=1)
    else:
        start_date = now - timedelta(days=30)

    start_str = start_date.strftime('%Y-%m-%d %H:%M:%S')
    end_str = now.strftime('%Y-%m-%d %H:%M:%S')

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()

        # Расходы
        sql_expenses = '''
            SELECT category, SUM(sum), COUNT(*) 
            FROM expenses 
            WHERE user_id = ? AND date_time BETWEEN ? AND ?
        '''
        params_expenses = [user_id, start_str, end_str]
        if category:
            sql_expenses += ' AND category = ?'
            params_expenses.append(category)
        sql_expenses += ' GROUP BY category'
        expenses_stats = cursor.execute(sql_expenses, params_expenses).fetchall()

        # Доходы
        sql_income = '''
            SELECT SUM(sum), COUNT(*) 
            FROM income 
            WHERE user_id = ? AND date_time BETWEEN ? AND ?
        '''
        params_income = [user_id, start_str, end_str]
        income_stat = cursor.execute(sql_income, params_income).fetchone()

    return {
        'expenses': expenses_stats,
        'income': income_stat
    }

# Инициализация базы
create_tables()

# Пример использования:
# Создаём пользователя
user_id = add_user('john_doe', 'john@example.com', 'password123', initial_balance=0)

# Добавляем категорию расходов
add_category(user_id, 'Food', 'expense')
add_category(user_id, 'Salary', 'income')

# Добавляем расход
add_expense(user_id, 50, 'Food')

# Добавляем доход
add_income(user_id, 500)

# Проверяем баланс
print('Баланс:', get_user_balance(user_id))

# Получение статистики за текущий месяц
stats = get_statistics(user_id, period='month')
print('Статистика за месяц:', stats)