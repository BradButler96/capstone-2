-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES (
        'testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'test.user@email.com',
        FALSE
    ),(
        'testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'test.admin@email.com',
        TRUE
    ),(
        'extrauser',
        '$2b$12$emwOFUyQIhPTrdye4inCX.iZhXo9P65MCkq1AQiLdPGg3YCzdv4hC',
        'Extra',
        'User',
        'extra.user@email.com',
        FALSE
    );


INSERT INTO favorites (token_id, user_id)
VALUES (
        '1',
        '1'
    ),(
        '1027',
        '1'
    ),(
        '825',
        '2'
    ),(
        '1839',
        '2'
    ),(
        '1',
        '3'
    ),(
        '1027',
        '3'
    ),(
        '825',
        '3'
    ),(
        '1839',
        '3'
    );

-- INSERT INTO buy_orders (user_id, token_id, token_name, quantity, price)
-- VALUES ('3', '1', 'Bitcoin', '0.5', '20000');

-- INSERT INTO sell_orders (user_id, token_id, token_name, quantity, price)
-- VALUES ('3', '1', 'Bitcoin', '0.5', '24000');
