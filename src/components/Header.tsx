import { Link } from '@tanstack/react-router';
import { ModeToggle } from './ModeToggle';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-700 text-white">
      <Link to="/">
        <h1>Ticketing</h1>
      </Link>
      <div className="flex items-center gap-2">
        <Link to="/boards" className="[&.active]:font-semibold">
          Boards
        </Link>
        <Link to="/tickets" className="[&.active]:font-semibold">
          Tickets
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
}
