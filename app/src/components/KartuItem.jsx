import { Link } from 'react-router-dom'

export default function KartuItem({ item }) {
  const { id, judul, kategori, penulis, tahunTerbit } = item

  return (
    <article className="kartu">
      <h3>
        <Link to={`/koleksi/${id}`}>{judul}</Link>
      </h3>
      <p>
        {kategori} • {penulis} ({tahunTerbit})
      </p>
    </article>
  )
}