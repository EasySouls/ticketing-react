import { Link } from '@tanstack/react-router';

export default function Header() {
  return (
    <header className="flex justify-between p-4 bg-blue-700 text-white">
      <Link to="/">
        <h1>Ticketing</h1>
      </Link>
      <div className="flex items-center gap-2">
        <Link to="/boards" className="[&.active]:font-bold">
          Boards
        </Link>
        <Link to="/tickets" className="[&.active]:font-bold">
          Tickets
        </Link>
      </div>
    </header>
  );
}
