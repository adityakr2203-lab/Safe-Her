import Card from './Card.jsx';

function LoadingCard() {
  return (
    <Card>
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-1/2 rounded-full bg-slate-200" />
        <div className="h-24 rounded-2xl bg-slate-100" />
        <div className="h-4 w-3/4 rounded-full bg-slate-200" />
      </div>
    </Card>
  );
}

export default LoadingCard;
