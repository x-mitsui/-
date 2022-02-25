const CollectionModel = require('../db/models/collection')
class CollectionService {
  async addCollection(data) {
    const cid = data.cid

    const result = await CollectionModel.findOne(data, {
      where: { cid },
    })
    console.log('>', cid, ':', result)
    if (result) {
      return await CollectionModel.update(data, {
        where: { cid },
      })
    } else {
      return await CollectionModel.create(data)
    }
  }
}

module.exports = new CollectionService()
