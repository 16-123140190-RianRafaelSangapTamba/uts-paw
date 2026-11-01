import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, expect, test, vi } from 'vitest'
import App from './App.jsx'

// Data tiruan (mock) sesuai tema Rak Buku Pribadi agar tidak butuh koneksi internet saat tes
const DATA = [{ 
  id: '1', 
  judul: 'Bumi Manusia', 
  kategori: 'Fiksi', 
  penulis: 'Pramoedya Ananta Toer', 
  tahunTerbit: '1980', 
  status: 'Selesai Dibaca' 
}]

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(DATA))))
})

function buka(path) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

// 1. Test bawaan modul (Cek render hasil fetch)
test('menampilkan data hasil fetch di halaman koleksi', async () => {
  buka('/koleksi')
  expect(await screen.findByText('Bumi Manusia')).toBeInTheDocument()
})

// 2. Test bawaan modul (Cek validasi form)
test('form menolak judul kosong', async () => {
  buka('/tambah')
  await userEvent.click(screen.getByRole('button', { name: 'Simpan' }))
  expect(screen.getByRole('alert')).toHaveTextContent('Judul wajib diisi')
})

// 3. Test buatan 1 (Cek halaman beranda)
test('menampilkan judul Rak Buku Pribadi di beranda', async () => {
  buka('/')
  expect(await screen.findByText('Rak Buku Pribadi')).toBeInTheDocument()
})

// 4. Test buatan 2 (Cek halaman detail menampilkan Penulis)
test('menampilkan nama penulis di halaman detail buku', async () => {
  buka('/koleksi/1')
  expect(await screen.findByText('Pramoedya Ananta Toer')).toBeInTheDocument()
})

// 5. Test buatan 3 (Cek halaman 404)
test('menampilkan halaman tidak ditemukan untuk rute ngacak', async () => {
  buka('/rute-ngacak-banget')
  expect(await screen.findByText('Halaman tidak ditemukan.')).toBeInTheDocument()
})