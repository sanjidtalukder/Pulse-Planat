# 🚀 Astra Command - Civic Engagement Dashboard  

**Astra Command** is a modern, user-friendly civic engagement dashboard.  
It is built with **React, TypeScript, and Tailwind CSS** and provides real-time monitoring, mission management, and community activity tracking.  

---

## ✨ Features  

### 🔐 Authentication  
- Google OAuth (Firebase Authentication)  
- Protected Routes (secure access control)  
- Session Management (persistent login state)  

### 📊 Dashboard Sections  
- **Street Pulse** → Real-time community activity  
- **Orbit View** → Geographic & spatial data visualization  
- **Veracity Missions** → Task and mission management  
- **Civic Blueprint** → Urban planning and development tools  
- **Legacy Track** → Historical data and analytics  

### 🎨 User Interface  
- Clean & modern design  
- Fully responsive (desktop + mobile)  
- Icon-based tab navigation  
- Real-time status updates  

---

## 🛠 Technology Stack  

**Frontend:**  
- React 18.3.1  
- TypeScript 5.8.3  
- Tailwind CSS 3.4.17  
- shadcn/ui + Radix UI  

**Authentication & Database:**  
- Firebase 12.3.0 (Authentication, Firestore, Storage, Realtime Database)  

**Additional Libraries:**  
- React Router DOM  
- React Hook Form  
- TanStack Query  
- Recharts  
- Leaflet  
- Lucide React + Sonner  

---

## 🚀 Getting Started  

### ✅ Prerequisites  
- Node.js (18+)  
- npm or yarn  
- Firebase Project (with Google OAuth enabled)  

### ⚡ Installation  
```bash
# Clone the repository
git clone <repository-url>
cd astra-command

# Install dependencies
npm install

# Add Firebase config
# Copy your Firebase keys to: src/firebase/config.js

# Start development server
npm run dev
```

📍 The app will run at **http://localhost:5173**  

---

## 📁 Project Structure  

```
src/
├── components/           
│   ├── ui/               # Reusable UI
│   ├── StreetPulse/      # Community monitoring
│   ├── OrbitView/        # Maps & Geo data
│   ├── VeracityMissions/ # Mission management
│   ├── CivicBlueprint/   # Planning tools
│   └── LegacyTrack/      # Analytics
├── firebase/             # Firebase config
├── App.tsx               # Main app
└── index.tsx             # Entry point
```

---

## 🎯 Key Components  

### 🔎 Navigation  
- Sticky header  
- Icon-based tabs  
- User profile with logout  
- Responsive across all devices  

### 🔐 Authentication Flow  
Firebase `onAuthStateChanged` is used to detect user login state.  
```tsx
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });
  return () => unsubscribe();
}, []);
```

---

## 🔧 Development Scripts  
```bash
npm run dev      # Start local server
npm run build    # Build for production
npm run lint     # Run ESLint checks
npm run preview  # Preview production build
```

---

## 🌐 Deployment  

### Vercel  
```bash
npm run build
vercel --prod
```

### Netlify  
```bash
npm run build
# Then drag & drop /dist folder into Netlify dashboard
```

---

## 🔒 Security  
- Firebase Security Rules  
- Protected Routes  
- Environment variables for sensitive config  
- CORS configuration  

---

## 📱 Responsive Design  
- Mobile-first approach  
- Grid-based layouts  
- Touch-friendly navigation  

---

## 🎨 Customization  
- Edit `tailwind.config.js` → change color schemes & spacing  
- Style components using Tailwind classes or shadcn/ui overrides  

---

## 🤝 Contributing  
1. Fork the repo  
2. Create a branch → `git checkout -b feature/awesome`  
3. Commit → `git commit -m "Add awesome feature"`  
4. Push → `git push origin feature/awesome`  
5. Open a Pull Request 🎉  

---

## 📄 License  
Licensed under the **MIT License**.  

---

## 🙏 Acknowledgments  
- **Firebase Team** → Robust backend services  
- **Tailwind CSS** → Utility-first styling  
- **React Community** → Continuous improvements  
- **shadcn/ui** → Beautiful, reusable components  

---

✨ Built with ❤️ for better **civic engagement & community development**  
