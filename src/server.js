import 'dotenv/config'
import { Server } from '@hapi/hapi'
import Albums from './api/albums/index.js'
import AlbumsService from './services/postgres/AlbumsService.js'
import AlbumValidator from './validator/albums/index.js'
import Songs from './api/songs/index.js'
import SongsServices from './services/postgres/SongsServices.js'
import SongValidator from './validator/songs/index.js'
import ClientError from './exceptions/ClientError.js'

const init = async () => {
  const albumsService = new AlbumsService()
  const songsServices = new SongsServices()
  const server = Server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })
  await server.register([
    {
      plugin: Albums,
      options: {
        service: albumsService,
        validator: AlbumValidator
      }
    },
    {
      plugin: Songs,
      options: {
        service: songsServices,
        validator: SongValidator
      }
    }
  ])
  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request
    if (response instanceof Error) {
      // penanganan client error secara internal.
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message
        })
        newResponse.code(response.statusCode)
        return newResponse
      }
      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!response.isServer) {
        return h.continue
      }
      // penanganan server error sesuai kebutuhan
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami'
      })
      newResponse.code(500)
      return newResponse
    }
    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue
  })
  await server.start()
  console.log(`server berjalan pada ${server.info.uri}`)
}
init()
