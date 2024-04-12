+-----------------+
| Tables_in_BOARD |
+-----------------+
| boardContent |
| boardPage |
| comment |
| user |
+-----------------+

boardContent
+---------------+--------------+------+-----+-------------------+-------------------+
| Field | Type | Null | Key | Default | Extra |
+---------------+--------------+------+-----+-------------------+-------------------+
| boardId | int unsigned | NO | | NULL | |
| writer | varchar(10) | NO | | NULL | |
| create_at | datetime | YES | | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| title | varchar(20) | YES | | NULL | |
| content | varchar(100) | YES | | NULL | |
| pageId | int unsigned | YES | | NULL | |
| commnetId | int unsigned | YES | | NULL | |
| looks | int unsigned | NO | | NULL | |
| likes | int unsigned | NO | | NULL | |
| writerID | varchar(10) | NO | | NULL | |
| lastRemake_at | datetime | YES | | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+---------------+--------------+------+-----+-------------------+-------------------+

boardPage
+-----------+--------------+------+-----+-------------------+-------------------+
| Field | Type | Null | Key | Default | Extra |
+-----------+--------------+------+-----+-------------------+-------------------+
| pageId | int unsigned | NO | | NULL | |
| writer | varchar(10) | NO | | NULL | |
| title | varchar(20) | YES | | NULL | |
| create_at | datetime | YES | | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| looks | int unsigned | NO | | NULL | |
| boardId | int unsigned | NO | PRI | NULL | |
+-----------+--------------+------+-----+-------------------+-------------------+

comment
+------------------+--------------+------+-----+-------------------+-------------------+
| Field | Type | Null | Key | Default | Extra |
+------------------+--------------+------+-----+-------------------+-------------------+
| commentId | int | NO | PRI | NULL | auto_increment |
| commentWriter | varchar(10) | NO | | NULL | |
| boardId | int unsigned | NO | | NULL | |
| commentCreate_at | datetime | YES | | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| replyId | int unsigned | YES | | NULL | |
| replyDepth | int unsigned | YES | | NULL | |
+------------------+--------------+------+-----+-------------------+-------------------+

user
+---------------+-------------+------+-----+-------------------+-------------------+
| Field | Type | Null | Key | Default | Extra |
+---------------+-------------+------+-----+-------------------+-------------------+
| userId | varchar(20) | NO | PRI | NULL | |
| userPassword | varchar(20) | NO | | NULL | |
| userName | varchar(10) | NO | | NULL | |
| userCreate_at | datetime | YES | | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+---------------+-------------+------+-----+-------------------+-------------------+
