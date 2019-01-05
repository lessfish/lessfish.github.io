# sql2markdown

将 SQL 中的 INSERT INTO 语句中的数据转为 markdown 中的 table ，目前我主要搭配 Sequel Pro 使用

input:

```sql
INSERT INTO `music_video` (`id`, `video_id`, `name`)
VALUES
  (1, NULL, NULL),
  (2, 1080797681514790900, '日式请柬'),
  (3, 1080797681514790925, '小清新请柬');
```

output:

```
| id   | video_id            | name  |
| :--- | :------------------ | :---- |
| 1    | NULL                | NULL  |
| 2    | 1080797681514790900 | 日式请柬  |
| 3    | 1080797681514790925 | 小清新请柬 |
```