import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const QuickActions = () => (
  <div className="flex flex-wrap gap-3">
    <Link to="/admin/services/create">
      <Button variant="primary">Tambah Layanan</Button>
    </Link>
    <Link to="/admin/portfolio/create">
      <Button variant="outline">Tambah Portofolio</Button>
    </Link>
    <Link to="/admin/blog/create">
      <Button variant="outline">Tambah Artikel</Button>
    </Link>
  </div>
);

export default QuickActions;
