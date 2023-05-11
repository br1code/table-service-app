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
- table_number (internal table number assigned by the restaurant's staff)
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
2. User is redirected to https://`{CLIENT_URL}`?restaurant_id=`{RESTAURANT_ID}`&table_id=`{TABLE_ID}`
3. The frontend, **before displaying any content**, reads the query params (restaurant_id=`{RESTAURANT_ID}`&table_id=`{TABLE_ID}`) from the URL and sends a `GET` request to https://`{SERVER_URL}`/restaurant/`{RESTAURANT_ID}`/table/`{TABLE_ID}` asking for the information about the `Restaurant` and the `Table`.
4. The backend receives the `GET` request and reads the `{RESTAURANT_ID}` and `{TABLE_ID}` from the URL.
5. The backend queries the database with the given information. It checks if both the Restaurant and the Table exist and are enabled.
6. The backend responds with a JSON `{ restaurant_id: "", restaurant_name: "", table_id: "", table_number: ""}`
7. The frontend receives the JSON response. It stores the information as state, and displays the following content:
   1. The restaurant name.
   2. A button to ask for help.
   3. A optional field to enter a message.
8. User clicks a button to ask for help. OPTIONAL: User can enter a message for the Restaurant's staff.
9.  When the user clicks the button, a `POST` request is sent to https://`{SERVER_URL}`/notification with the following information as JSON: `{ restaurant_id: "", table_id: "", message: ""}`
10. The backend receives the `POST` requests and reads the `restaurant_id`, the `table_id`, and the `message` from the body.
11. The backend performs validations to check if both the restaurant and the table exist and are enabled.
12. The backend inserts a new row in the `TableNotification` table with the given information.

Result:

A new notification was created.