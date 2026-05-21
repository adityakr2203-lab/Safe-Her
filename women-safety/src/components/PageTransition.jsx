import { useLocation } from 'react-router-dom';

function PageTransition({ children }) {
  const location = useLocation();

  return (
    <div className="animate-page-enter" key={location.pathname}>
      {children}
    </div>
  );
}

export default PageTransition;
