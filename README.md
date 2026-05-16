# 💬 QuickChat – MERN Real-Time Chat Application

QuickChat is a full-stack real-time chat application built using the **MERN Stack** with **Socket.IO** for instant messaging. Users can sign up, log in, update profiles, send messages in real time, view online/offline status, and receive unseen message notifications.

## 🚀 Features

* 🔐 User Authentication (JWT)
* 👤 Signup & Login System
* 🖼️ Profile Picture Upload (Cloudinary)
* ✏️ Edit Profile (Bio, Name, Image)
* 💬 Real-Time Messaging using Socket.IO
* 🟢 Online / Offline User Status
* 🔔 Unseen Message Count
* 📱 Responsive UI
* 🔒 Protected Routes
* ☁️ MongoDB Atlas Database

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router DOM
* Axios
* React Hot Toast
* Socket.IO Client
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* BcryptJS
* Socket.IO
* Cloudinary
* Dotenv
* CORS

## 📂 Project Structure

```bash
ChatApp/
│── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
│── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── lib/
│   └── server.js
│
└── README.md
```

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Priyanshu-1705/QuickChat.git
cd QuickChat
```

### 2️⃣ Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd server
npm install
```

### 3️⃣ Create Environment Variables

Inside the `server` folder, create a `.env` file:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

### 4️⃣ Run the Application

#### Start Backend

```bash
cd server
npm run server
```

#### Start Frontend

```bash
cd client
npm run dev
```

## 📸 Screenshots

<img width="2559" height="1311" alt="image" src="https://github.com/user-attachments/assets/61ade3fd-ee86-4310-b496-ef0750675817" />

<img width="2174" height="1081" alt="image" src="https://github.com/user-attachments/assets/3aff910e-d65d-46fb-90e2-11abf315ba02" />

<img width="2141" height="1192" alt="image" src="https://github.com/user-attachments/assets/b9188594-92a3-4e06-b187-7b5310857d86" />

<img width="1831" height="1134" alt="image" src="https://github.com/user-attachments/assets/cd991b34-21fe-4e5a-aaf7-029c244e66fc" />


## 🌟 Future Improvements

* 📩 Image Messaging
* 😊 Emoji Support
* 🌙 Dark Mode
* ✔️ Message Seen Status
* 📞 Audio/Video Calling
* 🔍 Better User Search

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

## 📄 License

This project is for learning and portfolio purposes.

## 👨‍💻 Developer

**Priyanshu Gangwar**

If you like this project, consider giving it a ⭐ on GitHub!
