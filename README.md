
# Kookie Crumbs

A real-time food ordering app built with Expo and Supabase. The app features two main roles:

- **User Side**: Users can place orders, track the status of their orders in real time, and receive updates when their order status changes

- **Admin Side**: Admins receive notifications for new orders and can update their status. Admins can also manage food items on the menu (add, edit, delete).




## Features


### User Side
- **Place Orders**: Users can browse the available food items and place orders.
- **Track Order Status**: Users can view real-time updates of their order status, including the stages of the order (New, Cooking, Delivering, Delivered).
- **Real-time Notifications**: When the admin updates the order status, users receive live notifications about their order progress.

### Admin Side
- **Order Management**: Admins can view all user orders in real time. They can update the order status to track its progress.
- **Real-Time Notifications**: Admins receive notifications whenever a new order is placed by a user.
- **Food Item Management**: Admins have the ability to add, edit, or delete food items from the menu. This allows dynamic updating of available items.

### Additional Features
- **Authentication**: User and admin authentication using **Supabase**.
- **Database Schema**: The database is designed to store user details, orders, food items, and real-time status updates.


## Technologies Used
- **Expo**: For building the mobile application.
- **Supabase**: Backend for database, real-time updates, and authentication.
- **React Native**: For building the app UI.
- **PostgreSQL** (via Supabase): For data storage and real-time updates.
- **Supabase RealTime functions**: For real-time communication between the user and admin sides.



## Database Schema Diagram

![Database Schema Diagram](./images/database%20schema.jpg)


## Screenshots

Here are some screenshots of the app's functionality:


### Sign in / Sign up

<table>
  <tr>
    <td align="center">
      <p><strong>Sign Up</strong></p>
      <img src="./images/sign%20up%20screen.jpg" alt="Sign Up" width="300"/>
    </td>
    <td align="center">
      <p><strong>Sign In</strong></p>
      <img src="./images/sign%20in%20screen.jpg" alt="Sign In" width="300"/>
    </td>
  </tr>
</table>



### User Side
- **Food Menu**: Browse available food items and place orders.
<table>
  <tr>
    <td align="center">
      <p><strong>User Profile</strong></p>
      <img src="./images/user%20profile.jpg" alt="User Profile" width="200"/>
    </td>
    <td align="center">
      <p><strong>Food Menu</strong></p>
      <img src="./images/Menu%20screen.jpg" alt="Food Menu" width="200"/>
    </td>
    <td align="center">
      <p><strong>Item</strong></p>
      <img src="./images/user%20item%20screen.jpg" alt="Item" width="200"/>
    </td>
    <td align="center">
      <p><strong>Cart</strong></p>
      <img src="./images/user%20cart.jpg" alt="Cart" width="200"/>
    </td>
  </tr>
</table>


### User Side
- **Order Status**: Track the status of your order in real-time.

<table>
  <tr>
    <td align="center">
      <p><strong>Order Status</strong></p>
      <img src="./images/user%20ordered.jpg" alt="Order Status" width="200"/>
    </td>
  </tr>
</table>

### Admin Side
- **Admin Dashboard**: View and manage all orders.

<table>
  <tr>
    <td align="center">
      <p><strong>Admin Dashboard</strong></p>
      <img src="./images/admin%20screen.jpg" alt="Admin Dashboard" width="200"/>
    </td>
    <td align="center">
      <p><strong>Admin Menu</strong></p>
      <img src="./images/admin%20menu.jpg" alt="Admin Menu" width="200"/>
    </td>
  </tr>
</table>

- **Manage Food Items**: Add or edit food items available for users.

<table>
  <tr>
    <td align="center">
      <p><strong>Food Item</strong></p>
      <img src="./images/admin%20edit%20order.jpg" alt="Food item" width="200"/>
    </td>
    <td align="center">
      <p><strong>Food Item Edit</strong></p>
      <img src="./images/admin%20order%20update.jpg" alt="Food item edit" width="200"/>
    </td>
    <td align="center">
      <p><strong>Admin Order Side</strong></p>
      <img src="./images/admin%20order%20side.jpg" alt="Admin Order Side" width="200"/>
    </td>
    <td align="center">
      <p><strong>Admin Order Status</strong></p>
      <img src="./images/admin%20order%20status.jpg" alt="Admin order status" width="200"/>
    </td>
  </tr>
</table>

## Installation

 1. Install my-project with npm

```bash
  npm install 
  cd my-project
```

2. Set up your Supabase project:

- Go to Supabase, create a project, and obtain the SUPABASE_URL and SUPABASE_ANON_KEY.
- Set up your database schema (you can find the SQL schema in supabase.sql file).

3. Create a .env file in the root directory and add the following values:
```
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON=
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

```

4. Run the app:

```
npm start
```

This will start the app, and a QR code will appear. Scan it with the Expo Go app to open the app on your mobile device.


    
