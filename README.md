# 🪙 Crypto Fusion

Crypto Fusion is a **full-stack crypto trading hub** built with **Spring Boot** and **React.js**, delivering a secure and high-performance experience for cryptocurrency enthusiasts. It features **real-time price charts**, **portfolio management**, **wallet integration**, and **payment gateway integration** using Razorpay and Stripe.

With Crypto Fusion, users can:
- 📊 View real-time cryptocurrency prices and dynamic charts to track market trends
- 💼 Manage their personal investment portfolio with ease
- 🔐 Integrate their crypto wallets securely for transaction tracking
- 💳 Make deposits and purchases using trusted payment gateways like **Razorpay** and **Stripe**

Whether you're a beginner exploring the world of digital assets or an experienced trader, Crypto Fusion aims to make your crypto journey intuitive, insightful, and secure.

![Screenshot 2025-05-08 014944](https://github.com/user-attachments/assets/7b282589-1fea-40f1-b189-fff0535bcbd5)

---

## 🚀 Key Achievements

- 🔐 **Secure Authentication** using JWT (JSON Web Tokens) and Spring Security.
- 🛡️ **Two-Factor Authentication (2FA)** support for enhanced login security.
- 📊 **Live Crypto Price Charts** using ApexCharts and Recharts.
- 💼 **Portfolio & Wallet Management** for tracking assets and balance.
- 💳 **Payment Gateway Integration** with **Stripe** and **Razorpay** for seamless transactions.
- 📬 **Email Notification Support** via Spring Mail for user alerts and confirmations.
- 📦 **Modular Backend Architecture** with Spring Boot and JPA, ensuring scalability and maintainability.
- 🎨 **Modern, Responsive UI** using TailwindCSS and Radix UI Components.
- 📈 **Admin Dashboard** and advanced state management powered by Redux.

---
## 🌟 Features

- 🔐 **Authentication & Authorization**
  - JWT-based login/logout
  - Role-based access (User/Admin)
  - Two-Factor Authentication (2FA)

- 📊 **Live Market Data**
  - Real-time charts with ApexCharts and Recharts
  - Market trend analysis & history

- 💼 **Wallet & Portfolio Management**
  - Add, remove, and monitor crypto assets
  - Track balance and performance

- 💳 **Payment Integrations**
  - **Stripe** and **Razorpay** integration
  - Seamless deposit and withdrawal process

- 📬 **Email Functionality**
  - Verification, password reset, and transaction updates

- 🧑‍💼 **Admin Dashboard**
  - User and transaction management
  - System health monitoring

- 🎨 **Modern UI/UX**
  - Fully responsive design
  - Built with TailwindCSS & Radix UI

- 🧩 **Scalable Backend Architecture**
  - Spring Boot RESTful APIs
  - MySQL + JPA for persistent storage

---

## 🧰 Built With (Tech Stack)

### Frontend
- [React.js](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [ApexCharts](https://apexcharts.com/) & [Recharts](https://recharts.org/)
- [Yup](https://github.com/jquense/yup) / [Zod](https://zod.dev/) for validation
- [Axios](https://axios-http.com/) for HTTP requests

### Backend
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [MySQL](https://www.mysql.com/)
- [JWT (jjwt)](https://github.com/jwtk/jjwt)
- [Razorpay Java SDK](https://github.com/razorpay/razorpay-java)
- [Stripe Java SDK](https://github.com/stripe/stripe-java)
- [Lombok](https://projectlombok.org/)

---

## 📁 Folder Structure

```bash
crypto-fusion-application/
│
├── crypto_fusion_frontend/ # React.js Frontend
│ ├── public/
│ ├── src/
│ ├── package.json
│ └── vite.config.js
│
├── crypto_fusion_server/ # Spring Boot Backend
│ ├── src/
│ ├── pom.xml
│ └── application.properties.example
│
└── README.md
```

---

## 🛠️ Getting Started

To get a local copy up and running, follow these steps.

### ✅ Prerequisites

- Node.js (v18 or above)
- Java (JDK 21+)
- Maven
- MySQL
- Git

### 📦 Installation

#### 1. Clone the repository

```bash
git clone https://github.com/Md-Kaish-Alam/crypto-fusion-application.git
cd crypto-fusion-application
```

#### 2. Backend Setup (Spring Boot)

```bash
cd crypto_fusion_server
```

- Create a MySQL database (e.g., `crypto_fusion_db`)
- Rename `application.properties.example` to `application.properties`
- Update database credentials and API keys inside `application.properties`

```bash
# Application Info
spring.application.name=crypto_fusion_server
server.port=8088

# Database Configuration
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD
spring.datasource.url=jdbc:mysql://localhost:3306/crypto_fusion
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.open-in-view=false

# Stripe API
stripe.api.key=YOUR_STRIPE_SECRET_KEY

# Razorpay API
razorpay.api.key=YOUR_RAZORPAY_API_KEY
razorpay.api.secret.key=YOUR_RAZORPAY_SECRET_KEY

# Email Configuration (Gmail SMTP)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=YOUR_EMAIL@gmail.com
spring.mail.password=YOUR_APP_PASSWORD
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

- Run the backend server

```bash
./mvnw spring-boot:run
```

#### 3. Frontend Setup (React + Vite)

```bash
cd ../crypto_fusion_frontend
npm install
npm run dev
```

Your app will run at [http://localhost:5173](http://localhost:5173) and connect to the backend on [http://localhost:8088](http://localhost:8088).

---

## 🐳 Docker Deployment

Build the image

```bash
docker build -t crypto-fusion-server .
```

Run the container

```bash
docker run -d -p 8088:8088 --name crypto-fusion \
  -e DB_USERNAME=your_user \
  -e DB_PASSWORD=your_pass \
  -e STRIPE_API_KEY=your_key \
  -e RAZORPAY_API_KEY=your_key \
  -e RAZORPAY_SECRET_KEY=your_secret \
  -e EMAIL_USERNAME=your_email \
  -e EMAIL_PASSWORD=your_email_password \
  crypto-fusion-server
```
🔐 It's recommended to use a `.env` file or a secrets manager for production environments.

#### 1. Dockerfile

```bash
# Importing JDK and copying required files
FROM openjdk:19-jdk AS build
WORKDIR /app
COPY pom.xml .
COPY src src

# Copy Maven wrapper
COPY mvnw .
COPY .mvn .mvn

# Set execution permission for the Maven wrapper
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

# Stage 2: Create the final Docker image using OpenJDK 19
FROM openjdk:19-jdk
VOLUME /tmp

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
EXPOSE 8088
```

#### 2. `.env` (Sample for Local Development)

```bash
# MySQL
DB_USERNAME=root
DB_PASSWORD=nuwaish@1511
DB_URL=jdbc:mysql://localhost:3306/crypto_fusion

# Stripe
STRIPE_API_KEY=sk_test_...

# Razorpay
RAZORPAY_API_KEY=rzp_test_...
RAZORPAY_SECRET_KEY=qXX9...

# Email (App password required)
EMAIL_USERNAME=cryptofusion1511@gmail.com
EMAIL_PASSWORD=eukxxjswgnzjcskk
```

✅ Note: Use `.env` with `docker run --env-file` `.env` for local environment variables.

---

## ☁️ Deployment Instructions

🚀 Frontend (Vercel)
- Push your frontend folder to GitHub
- Import repo to [Vercel](https://vercel.com/)
- Set build command: `npm run build`
- Set output directory: `dist`

⚙️ Backend (Render)
- Push backend to GitHub
- Create a new Web Service on [Render](https://render.com)
- Set build command: `./mvnw clean install`
- Set start command: `java -jar target/*.jar`
- Add environment variables (DB credentials, Stripe/Razorpay keys, etc.)

🐳 Docker Compose

```bash
# docker-compose.yml
version: '3.8'

services:
  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: crypto_fusion
    ports:
      - "3306:3306"

  backend:
    build: ./backend
    ports:
      - "8088:8088"
    depends_on:
      - mysql
```

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙌 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## Application Screenshots

Sign Up Page

![Screenshot 2025-05-08 014804](https://github.com/user-attachments/assets/1c0c1ca5-c5a8-4734-b1fd-9eccb670b781)


Login Page

![Screenshot 2025-05-08 014745](https://github.com/user-attachments/assets/6d8c51ed-47ac-46f2-b6e8-6a27d7d6277c)


Two Factor Authentication OTP Verification Page

![Screenshot 2025-05-08 014913](https://github.com/user-attachments/assets/acbedc53-e81c-46c2-992e-ecb52043665e)


Verification Email

![screencapture-mail-google-mail-u-0-2025-05-08-03_52_19](https://github.com/user-attachments/assets/c6582d1a-7ef0-4118-9b94-5a61349a8704)


Forgot Password Page

![Screenshot 2025-05-08 014822](https://github.com/user-attachments/assets/ec0769f4-e567-4bce-8957-2fe6561f74a9)


Forgot Password Email Verification

![screencapture-mail-google-mail-u-0-2025-05-08-03_55_40](https://github.com/user-attachments/assets/420d1264-039b-47cb-b05f-bb46a179ea54)


Reset Password Page

![Screenshot 2025-05-08 035521](https://github.com/user-attachments/assets/01f3fa7d-8aff-4f4e-873b-d1e8b4125d68)


Home Page

![Screenshot 2025-05-08 014944](https://github.com/user-attachments/assets/9b27d6c6-81f4-4c2a-9626-330659a50ed0)


![Screenshot 2025-05-08 015002](https://github.com/user-attachments/assets/1254feb3-c028-4b5d-ba79-2b7418e21b6a)


Portfolio Page

![Screenshot 2025-05-08 015219](https://github.com/user-attachments/assets/d6030951-f427-41b4-82cc-568fc68a1c4e)


Watchlist Page

![Screenshot 2025-05-08 015248](https://github.com/user-attachments/assets/f7a8d7b0-e88e-4a61-9c3e-e27f51d5c699)


Activity Page

![Screenshot 2025-05-08 015308](https://github.com/user-attachments/assets/f02bcde8-0ede-4e3c-8ad2-e33ae3ddb5be)


User's Wallet Page

![Screenshot 2025-05-08 015350](https://github.com/user-attachments/assets/4b3b0dad-e3cd-416e-b9d2-3fa07e6fa8c3)


Add Money To Wallet Form

![Screenshot 2025-05-08 015401](https://github.com/user-attachments/assets/a26ee2a5-1bc2-440a-b039-abc1286409f6)


Request Withdrawal Form

![Screenshot 2025-05-08 015414](https://github.com/user-attachments/assets/a19cddaf-8178-4862-939b-699dc8c9bebf)


Transfer To Other's Wallet Form

![Screenshot 2025-05-08 015426](https://github.com/user-attachments/assets/bd68135c-99bf-49f2-b93e-7bf75d48f0e4)


Payment Details Page

![Screenshot 2025-05-08 015452](https://github.com/user-attachments/assets/dd236a26-0754-44bd-abfe-fa39eff1cdbd)


Withdrawal Page

![Screenshot 2025-05-08 015510](https://github.com/user-attachments/assets/e8d58025-10c4-424a-946c-9c2baa8890de)


User Profile Page

![profile page](https://github.com/user-attachments/assets/70568108-7290-4562-871a-824fc4d30fda)


Update User Details Form

![Screenshot 2025-05-08 015605](https://github.com/user-attachments/assets/d823eb5d-cb22-4dcf-9e49-d38f23665315)


Admin All Withdrawal Page

![Admin Withdrawal](https://github.com/user-attachments/assets/804075c2-8ac2-479c-abc3-ffb39d44714b)
