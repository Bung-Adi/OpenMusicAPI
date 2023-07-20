import InvariantError from '../../exceptions/InvariantError.js'
import AlbumPayLoadSchema from './schema.js'

const AlbumValidator = {
  validateAlbumPayload: (payload) => {
    const valResult = AlbumPayLoadSchema.validate(payload)
    if (valResult.error) {
      throw new InvariantError(valResult.error.message)
    }
  }
}

export default AlbumValidator
