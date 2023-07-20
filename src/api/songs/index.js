import SongsHandler from './handler.js'
import routes from './routes.js'

const Songs = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const songsHandler = new SongsHandler(service, validator)
    server.route(routes(songsHandler))
  }
}

export default Songs
