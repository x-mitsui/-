const CollectionModel = require('../db/models/collection')
class CollectionService {
  async addCollection(data) {
    const cid = data.cid

    const result = await CollectionModel.findOne({
      where: { cid }
    })
    console.log('>', cid, ':', result)
    if (result) {
      return await CollectionModel.update(data, {
        where: { cid }
      })
    } else {
      return await CollectionModel.create(data)
    }
  }

  async getCollections() {
    return CollectionModel.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'posterUrl', 'courseIdList']
      },
      raw: true
    })
  }

  async updateCollectionStatus(cid, status) {
    console.log('collection-status:', status)
    return await CollectionModel.update(
      {
        status
      },
      {
        where: { cid },
        raw: true
      }
    )
  }
}

module.exports = new CollectionService()
