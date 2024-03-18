import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/tickets/')({
  component: TicketsPage,
});

function TicketsPage() {}
