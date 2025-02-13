# 📝 **User Authentication API (Express.js, MongoDB, JWT)**

## 📌 **Introduction**

This is a simple **User Authentication API** built using **Express.js, MongoDB, and JWT authentication**. The API allows users to:

1. **Register** (sign up) with a username, email, password, and other details.
2. **Login** to receive a JWT token, which is stored in cookies.
3. **Search Users** by username or email (protected route, requires authentication).

The API is containerized using **Docker** and can be run locally or in a Docker environment.

---

## 🚀 **Setup Instructions**

### **🔹 1️⃣ Run with Docker (Recommended)**

#### **Step 1: Build Docker Images**

```sh
docker-compose build
```

#### **Step 2: Start the Containers**

```sh
docker-compose up -d
```

This will:  
✅ Start the **Express.js server** on `http://localhost:8070`  
✅ Start a **MongoDB database** inside a Docker container

---

### **🔹 2️⃣ Run Locally (Without Docker)**

#### **Step 1: Install Dependencies**

Ensure **Node.js v22.14.0** is installed, then run:

```sh
npm install
```

#### **Step 2: Create a `.env` File**

Create a `.env` file in the project root with the following values:

```
PORT=8070
DB_URL=mongodb://localhost:27017/users
MONGO_URL=mongodb://mongo:27017/users
JWT_SECRET=thisIsmySecert
```

#### **Step 3: Start the Application**

```sh
npm start
```

This will start the API on **http://localhost:8070**

---

## 📌 **API Endpoints**

| Endpoint            | Method   | Description                                 |
| ------------------- | -------- | ------------------------------------------- |
| `/api/users/signup` | **POST** | Register a new user                         |
| `/api/users/login`  | **POST** | Login and receive JWT token                 |
| `/api/users/search` | **POST** | Search for a user (Requires Authentication) |

---

## 📷 **Postman API Testing Examples**

### 1. Signup

![signup](https://github.com/Dharansh-Neema/user-information/blob/main/utils/images/Signup.png)

### 2. Login

![login](https://github.com/Dharansh-Neema/user-information/blob/main/utils/images/LOGIN.png)

### 3. Search

![search](https://github.com/Dharansh-Neema/user-information/blob/main/utils/images/Search.png)
