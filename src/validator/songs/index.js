import InvariantError from '../../exceptions/InvariantError.js'
import SongPayLoadSchema from './schema.js'

const SongValidator = {
  validateSongPayload: (payload) => {
    const valResult = SongPayLoadSchema.validate(payload)
    if (valResult.error) {
      throw new InvariantError(valResult.error.message)
    }
  }
}

export default SongValidator
