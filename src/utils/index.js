const mapAlbum = ({ 
  id,
  name,
  year
}) => ({
  id,
  name,
  year
})

const mapSong = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: albumId
})

const mapSongGen = ({
  id,
  title,
  performer
}) => ({
  id,
  title,
  performer
})

export { mapAlbum, mapSong, mapSongGen }
