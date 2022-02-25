const AboutModel = require('../db/models/about')

class AboutService {
  async addAbout(data) {
    const aid = data.aid

    const result = await AboutModel.findOne({
      where: { aid },
    })

    if (result) {
      return await AboutModel.update(data, {
        where: { aid },
      })
    } else {
      return await AboutModel.create(data)
    }
  }
}

module.exports = new AboutService()
