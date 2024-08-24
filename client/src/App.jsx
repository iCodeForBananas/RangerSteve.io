import { Game } from './views/Game'
import { Home } from './views/Home'
import { HowToPlay } from './views/HowToPlay'
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import './sass/app.scss'

export function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="how-to-play" element={<HowToPlay />} />
        <Route path="game" element={<Game />} />
      </Route>
    </Routes>
  )
}
