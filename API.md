# Table of Contents

- [Table of Contents](#table-of-contents)
- [Classes](#classes)
  - [Faculty](#faculty)
  - [Courses](#courses)
- [Users](#users)
  - [GET](#get)
  - [POST](#post)
- [Enrollment](#enrollment)
  - [GET](#get-1)
  - [POST](#post-1)
- [Messages](#messages)
  - [GET](#get-2)
  - [POST](#post-2)

# Classes

## Faculty

```
/api/<facultyName>
```

`GET` returns list of courses  
`POST` returns

- `200` success
- `409` duplicate entry
- `500` server error

## Courses

```
/api/<facultyName>/<courseID>
```

`GET` returns course info  
`POST` returns

- `200` success
- `409` duplicate entry
- `500` server error

# Users

```
/api/users/
```

## GET

| Parameter             | Description               |
| --------------------- | ------------------------- |
| `email: required`     | Email of user to look for |
| `ta: optional`        | Search `tas` table        |
| `professor: optional` | Search `professors` table |
| `admin: optional`     | Search `admins` table     |

**NOTE:** Searches tables in order and returns first match. TA -> Professor -> Admin

```bash
curl -X GET <url>/api/users \
    -H 'Content-Type: application/json' \
    -d '{ "email": "bobbyc@sfu.ca", "professor": true }
```

## POST

| Parameter             | Description               |
| --------------------- | ------------------------- |
| `email: required`     | Email of user to look for |
| `firstName: optional` | User first name           |
| `lastName: optional`  | User last name            |

```bash
curl -X GET <url>/api/users \
    -H 'Content-Type: application/json' \
    -d '{ "email": "bobbyc@sfu.ca", "firstName": "Bobby", "lastName": "Chan" }
```

`POST` returns

- `200` success
- `409` duplicate entry
- `500` server error

# Enrollment

```
/api/enrollment
```

## GET

| Parameter         | Description               |
| ----------------- | ------------------------- |
| `email: required` | Email of user to look for |

```bash
curl -X GET localhost:8080/api/users -H 'Content-Type: application/json' -d '{ "email": "seank@sfu.ca" }'
```

```bash
[{"facultyName":"CMPT","courseID":"372"}]
```

## POST

| Parameter               | Description               |
| ----------------------- | ------------------------- |
| `email: required`       | Email of user to look for |
| `courseID: required`    | Course to enroll in       |
| `facultyName: required` | Faculty to enroll in      |

# Messages

```
/api/messages/
```

## GET

| Parameter               | Description                            |
| ----------------------- | -------------------------------------- |
| `courseID: required`    | Course message was sent to             |
| `facultyName: required` | Faculty message was sent to            |
| `limit: optional`       | Set number of messages to return or 50 |

```bash
curl -X GET <url>/api/messages \
    -H 'Content-Type: application/json' \
    -d '{ "courseID": "372", "facultyName": "CMPT", "limit": 50 }
```

## POST

| Parameter               | Description                    |
| ----------------------- | ------------------------------ |
| `email: required`       | Email of user who sent message |
| `courseID: required`    | Course message was sent to     |
| `facultyName: required` | Faculty message was sent to    |
| `text: required`        | Time message was sent/updated  |
| `edited: optional`      | Flag noting message was edited |

```bash
curl -X POST <url>/api/messages \
    -H 'Content-Type: application/json' \
    -d '{ "email": "bobbyc@sfu.ca, "courseID": "372", "facultyName": "CMPT", "text": "Hello world!" }
```
