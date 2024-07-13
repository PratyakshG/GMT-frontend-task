// import { createContext, useState, useEffect } from "react";
// import { auth } from "../firebase-config";

// interface AuthContextType {
//   currentUser: firebase.User | null;
// }

// const AuthContext = createContext<AuthContextType>({
//   currentUser: null,
// });

// const AuthProvider = ({ children }: any) => {
//   const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setCurrentUser(user);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
// export { AuthProvider };
