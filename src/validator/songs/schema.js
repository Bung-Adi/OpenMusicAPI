import Joi from 'joi'

const currentYear = new Date().getFullYear()

const SongPayLoadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(currentYear).required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number(),
  albumId: Joi.string()
})

export default SongPayLoadSchema
