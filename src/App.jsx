import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ProtectedRoute } from "./utils/auth";
import Search from "./pages/Search";
import { MusicProvider } from "./utils/ContextData";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./validators/login"));
const Signup = lazy(() => import("./validators/Singup"));
const Playlist = lazy(() => import("./pages/Playlist"));

function App() {
  return (
    <>
      <MusicProvider>
        <Suspense fallback={<h1>Loading.....</h1>}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/playlist"
              element={
                <ProtectedRoute>
                  <Playlist />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </MusicProvider>
    </>
  );
}

export default App;
