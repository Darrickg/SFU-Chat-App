# Table of Contents

- [Table of Contents](#table-of-contents)
- [Classes](#classes)
  - [Faculty](#faculty)
  - [Courses](#courses)
  - [Sections](#sections)
- [Users](#users)
- [Messages](#messages)
  - [GET](#get)
  - [POST](#post)

# Classes

## Faculty

```
/api/<facultyName>
```

`GET` returns list of faculties  
`POST` returns

- `200` success
- `409` duplicate entry
- `500` server error

## Courses

```
/api/<facultyName>/<courseID>
```

`GET` returns list of courses  
`POST` returns

- `200` success
- `409` duplicate entry
- `500` server error

## Sections

```
/api/<facultyName>/<courseID>/<sectionID>
```

`GET` returns list of sections  
`POST` returns

- `200` success
- `409` duplicate entry
- `500` server error

# Users

```
/api/users/
```

```bash
curl -X GET <url>/api/users \
    -H 'Content-Type: application/json' \
    -d '{ "email": "bobbyc@sfu.ca", "professor": true }
```

| Parameter             | Description               |
| --------------------- | ------------------------- |
| `email: required`     | Email of user to look for |
| `ta: optional`        | Search `tas` table        |
| `professor: optional` | Search `professors` table |
| `admin: optional`     | Search `admins` table     |

**NOTE:** Searches tables in order and returns first match. TA -> Professor -> Admin

`GET` returns list of users  
`POST` returns

- `200` success
- `409` duplicate entry
- `500` server error

# Messages

```
/api/messages/
```

## GET

| Parameter               | Description                      |
| ----------------------- | -------------------------------- |
| `sectionID: required`   | Section message was sent to      |
| `courseID: required`    | Course message was sent to       |
| `facultyName: required` | Faculty message was sent to      |
| `limit: required`       | Set number of messages to return |

```bash
curl -X GET <url>/api/messages \
    -H 'Content-Type: application/json' \
    -d '{ "sectionID": "D100", "courseID": "372", "facultyName": "CMPT", "limit": 50 }
```

## POST

| Parameter               | Description                    |
| ----------------------- | ------------------------------ |
| `email: required`       | Email of user who sent message |
| `sectionID: required`   | Section message was sent to    |
| `courseID: required`    | Course message was sent to     |
| `facultyName: required` | Faculty message was sent to    |
| `text: required`        | Time message was sent/updated  |
| `edited: optional`      | Flag noting message was edited |

```bash
curl -X POST <url>/api/messages \
    -H 'Content-Type: application/json' \
    -d '{ "email": "bobbyc@sfu.ca "sectionID": "D100", "courseID": "372", "facultyName": "CMPT", "text": "Hello world!" }
```
