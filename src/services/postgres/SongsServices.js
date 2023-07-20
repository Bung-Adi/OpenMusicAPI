import pkg from 'pg'
import { nanoid } from 'nanoid'
import InvariantError from '../../exceptions/InvariantError.js'
import NotFoundError from '../../exceptions/NotFoundError.js'
import { mapSong, mapSongGen } from '../../utils/index.js'

const { Pool } = pkg

class SongsServices {
  constructor () {
    this._pool = new Pool()
  }

  async addSong ({ title, year, genre, performer, duration, albumId }) {
    const id = `song-${nanoid(16)}`
    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, genre, performer, duration, albumId]
    }
    const result = await this._pool.query(query)
    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan')
    }
    return result.rows[0].id
  }

  async getSongs (title, performer) {
    const query = {
      text: 'SELECT id, title, performer FROM songs WHERE title LIKE $1 OR performer LIKE $2',
      values: [!title ? '%%' : `%${title}%`, !performer ? '%%' : `%${performer}%`]
    }
    const result = await this._pool.query(query)
    return result.rows
  }

  async getSongById (id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id]
    }
    const result = await this._pool.query(query)
    if (!result.rowCount) {
      throw new NotFoundError('Lagu tidak ditemukan')
    }
    return result.rows.map(mapSong)[0]
  }

  async editSongById (id, { title, year, genre, performer, duration, albumId }) {
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, "albumId" =$6  WHERE id = $7 RETURNING id',
      values: [title, year, genre, performer, duration, albumId, id]
    }
    const result = await this._pool.query(query)
    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui lagu.')
    }
  }

  async deleteSongById (id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id]
    }
    const result = await this._pool.query(query)
    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal di hapus')
    }
  }
}

export default SongsServices
