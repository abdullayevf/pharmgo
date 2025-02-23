![banner](./assets/pharmgo-banner.png)

# PharmGo

PharmGo is a full-stack application for managing pharmacy inventory, suppliers, buyers, and transactions.

## Features
- **User Authentication**: Register, login, and manage user roles.
- **Inventory Management**: Add, update, delete, and search medicines.
- **Supplier/Buyer Management**: View and edit supplier/buyer details.
- **Transactions**: Log and view transaction history.

## Technologies
- **Frontend**: Vue.js, Shadcn
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/pharmgo.git
    ```
2. Navigate to the project folder:
    ```bash
    cd pharmgo
    ```
3. Install dependencies for the client and server:
    ```bash
    cd client && npm install
    cd ../server && npm install
    ```
4. Set up environment variables:
    - Create a `.env` file in the server folder:
      ```
      JWT_SECRET=your_jwt_secret
      MONGO_URI=your_mongodb_uri
      ```
5. Run the application:
    - Start the server:
      ```bash
      cd server && npm start
      ```
    - Start the client:
      ```bash
      cd client && npm run serve
      ```

## License
This project is licensed under the MIT License.