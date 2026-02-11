import { Navigate } from "react-router-dom";
import { auth } from "../firebase/config"; // உங்கள் பார்த்தை சரிபார்க்கவும்
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedLogin = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // டேட்டா வந்தவுடன் லோடிங் நிறுத்துகிறோம்
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>; // இது இல்லையென்றால் பக்கம் பிளாங்க் ஆகத் தெரியும்

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedLogin;