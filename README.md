# table-service-app

Folder structure:

- server: NET Core App
- client: React app
- db: database files

## DB Schemas

`Restaurant`:
- restaurant_id (primary key)
- name
- address
- phone_number
- enabled (boolean value. Useful for when the Restaurant needs to disable a table for some internal reason)

`Table`:
- table_id (primary key)
- restaurant_id (foreign key for `Restaurant`)
- table_name (internal table number assigned by the restaurant's staff)
- enabled (boolean value. Useful for when the Restaurant needs to disable a table for some internal reason)

`TableNotification`:
- notification_id (primary key)
- table_id (foreign key for `Table`)
- message (if empty, the client just need some help. If not empty, this column will contains what the client needs)
- created_at (when the notification was created. Can be useful in the future for displaying a history of notifications)
- viewed (boolean value. Default value = `false`. Value will change to `true` when an employee marks the notification as viewed)

## Flows step-by-step

### Create Notification flow

Prerequisites:

- A Restaurant is created in the database.
- Tables for the Restaurant are created in the database.
- QR codes are generated for each table.

Flow:

1. User scans QR code.
2. User is redirected to [https://{CLIENT_URL}/customer?restaurant_id={RESTAURANT_ID}&table_id={TABLE_ID}](https://{CLIENT_URL}/customer?restaurant_id={RESTAURANT_ID}&table_id={TABLE_ID})
3. The frontend, **before displaying any content**, reads the query params (restaurant_id=`{RESTAURANT_ID}`&table_id=`{TABLE_ID}`) from the URL and sends a `GET` request to [https://{SERVER_URL}/api/restaurants/{RESTAURANT_ID}/table/{TABLE_ID}](https://{SERVER_URL}/api/restaurants/{RESTAURANT_ID}/table/{TABLE_ID}) asking for the information about the `Restaurant` and the `Table`.
4. The backend receives the `GET` request and reads the `{RESTAURANT_ID}` and `{TABLE_ID}` from the URL.
5. The backend queries the database with the given information. It checks if both the Restaurant and the Table exist and are enabled.
6. The backend responds with the following JSON:

```json
{ 
    "restaurant_id": "", 
    "restaurant_name": "", 
    "table_id": "", 
    "table_name": ""
}
```

7. The frontend receives the JSON response. It stores the information as state, and displays the following content:
   1. The restaurant name.
   2. A message explaining what this application does.
   3. A optional field to enter a message for the Restaurant staff.
   4. A button to send a notification ("ask for help" or something like that).
8. User clicks a button to ask for help. OPTIONAL: User can enter a message for the Restaurant's staff.
9.  When the user clicks the button, a `POST` request is sent to [https://{SERVER_URL}/api/notifications](https://{SERVER_URL}/api/notifications) with the following JSON: 

```json    
{ 
    "restaurant_id": "", 
    "table_id": "", 
    "message": ""
}
```

10. The backend receives the `POST` requests and reads the `restaurant_id`, the `table_id`, and the `message` from the body.
11. The backend performs validations to check if both the restaurant and the table exist and are enabled.
12. The backend inserts a new row in the `TableNotification` table with the given information.

Result:

A new notification was created.

### Show Notifications flow (simplified without web sockets)

Prerequisites:

- A Restaurant is created in the database.
- Tables for the Restaurant are created in the database.
- A few Notifications for some tables are created in the database.

Flow:

1. Employee access the URL [https://{CLIENT_URL}/staff](https://{CLIENT_URL}/staff)
2. The frontend, **before displaying any content**, sends a GET request to [https://{SERVER_URL}/api/restaurants/{RESTAURANT_ID}](https://{SERVER_URL}/api/restaurants/{RESTAURANT_ID}) asking for the restaurant information.
3. The backend receives the GET request and reads the `{RESTAURANT_ID}` from the URL.
4. The backend checks if the Restaurant exists, and if so, returns the following JSON:

```json
{
    "restaurant_id": "",
    "restaurant_name": ""
}
```
5. The frontend receives the JSON and stores the restaurant information as state.
6. The frontend starts a interval of 10 seconds. Every 10 seconds, the frontend sends a GET request to [https://{SERVER_URL}/api/notifications/{RESTAURANT_ID}](https://{SERVER_URL}/api/notifications/{RESTAURANT_ID})

7. The backend receives the GET request and reads the `{RESTAURANT_ID}` from the URL.
8. The backend checks if the Restaurant exists, and if so, it queries all the NOT VIEWED (viewed = false) notifications for the given restaurant.

9. The backend responds with the following JSON:

```json
{ 
    "notifications": [
        {
            "notification_id": "",
            "table_id": "",
            "table_name": "",
            "created_at": "",
            "message": ""
        }, 
        {
            "notification_id": "",
            "table_id": "",
            "table_name": "",
            "created_at": "",
            "message": ""
        }
    ]
}
```
10. The frontend receives the JSON and display/updates the list of notifications.

Result:
The employee can see all the not-viewed notifications.

### Discard Notification (mark a Notification as viewed) flow

TODO