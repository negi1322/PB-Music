import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthRoute, ProtectedRoute } from "./utils/auth";
import Search from "./pages/Search";
import { MusicProvider } from "./utils/ContextData";
import Favourite from "./pages/Favourite";

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

            <Route
              path="/signup"
              element={
                <AuthRoute>
                  <Signup />
                </AuthRoute>
              }
            />
            <Route
              path="/login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />

            <Route
              path="/playlist"
              element={
                <ProtectedRoute>
                  <Playlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favourite"
              element={
                <ProtectedRoute>
                  <Favourite />
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
