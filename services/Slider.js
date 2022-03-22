const SliderModel = require('../db/models/slider')

class SliderService {
  async addSliderData(data) {
    const cid = data.cid
    const result = await SliderModel.findOne({
      where: { cid }
    })

    if (result) {
      return await SliderModel.update(data, {
        where: { cid }
      })
    } else {
      return await SliderModel.create(data)
    }
  }

  getSliders() {
    return SliderModel.findAll({
      attributes: {
        exclude: ['imgUrl', 'createdAt', 'updatedAt']
      },
      raw: true
    })
  }

  async updateSliderStatus(cid, status) {
    console.log('slider-status:', status)
    return await SliderModel.update(
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

module.exports = new SliderService()
