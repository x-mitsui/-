const { startProcess, qiniuUploads, returnInfo } = require('../libs/utils')
const { addSliderData } = require('../services/Slider')
const { addAgencyInfo } = require('../services/AgencyInfo')
const { addRecomCourse } = require('../services/RecomCourse')
const { addCollection } = require('../services/Collection')
const { addTeacher } = require('../services/Teacher')
const { addStudent } = require('../services/Student')
const { addCourseTab } = require('../services/CourseTab')
const { addCourse } = require('../services/Course')
const { addAbout } = require('../services/About')
const { qiniu } = require('../config/config')
const { CRAWLER } = require('../config/error_config')

class Crawler {
  async crawlSliderData(ctx, next) {
    ctx.body = await new Promise((resolve, reject) => {
      startProcess({
        file: 'slider',
        async message(data) {
          console.log(data)
          data.map(async (item) => {
            if (item.imgUrl && !item.imgKey) {
              try {
                const imgData = await qiniuUploads({
                  url: item.imgUrl,
                  bucket: qiniu.bucket.tximg.bucket_name,
                  dirName: 'crawled-img/',

                  ext: '.jpg'
                })

                if (imgData.key) {
                  item.imgKey = imgData.key
                }

                const result = await addSliderData(item)

                if (result) {
                  console.log('Data change successfully')
                } else {
                  console.log('Data change failed')
                }
              } catch (error) {
                console.log(error)
              }
            }
          })
          resolve(returnInfo(CRAWLER.CRAWL_DATA_SUCCESS))
        },
        async exit(code) {
          console.log(code)
        },
        async error(err) {
          resolve(returnInfo(CRAWLER.CRAWL_DATA_FAILED))
        }
      })
    })
  }

  async crawlAgencyInfo(ctx, next) {
    ctx.body = await new Promise((resolve, reject) => {
      startProcess({
        file: 'agencyInfo',
        async message(data) {
          console.log(data)
          try {
            const logoData = await qiniuUploads({
              url: data.logoUrl,
              bucket: qiniu.bucket.tximg.bucket_name,
              dirName: 'crawled-img/',
              ext: '.jpg'
            })
            if (logoData.key) {
              data.logoKey = logoData.key
            }

            const result = await addAgencyInfo(data)

            if (result) {
              console.log('Data change successfully')
            } else {
              console.log('Data change failed')
            }
            next()
          } catch (e) {
            // statements
            console.log(e)
          }
          resolve(returnInfo(CRAWLER.CRAWL_DATA_SUCCESS))
        },
        async exit(code) {
          console.log(code)
        },
        async error(err) {
          console.log(err)
          reject(returnInfo(CRAWLER.CRAWL_DATA_FAILED), err.message)
        }
      })
    })
  }

  async crawlRecomCourse(ctx, next) {
    ctx.body = await new Promise((resolve, reject) => {
      startProcess({
        file: 'recomCourse',
        async message(data) {
          data.forEach(async (item) => {
            try {
              if (item.imgUrl && !item.imgKey) {
                const picData = await qiniuUploads({
                  url: item.imgUrl,
                  bucket: qiniu.bucket.tximg.bucket_name,
                  dirName: 'crawled-img/',
                  ext: '.jpg'
                })
                if (picData.key) {
                  item.imgKey = picData.key
                }
              }

              if (item.teacherImg && !item.teacherImgKey) {
                const teacherImgData = await qiniuUploads({
                  url: item.teacherImg,
                  bucket: qiniu.bucket.tximg.bucket_name,
                  dirName: 'crawled-img/',
                  ext: '.jpg'
                })
                if (teacherImgData.key) {
                  item.teacherImgKey = teacherImgData.key
                }
              }

              const result = await addRecomCourse(item)

              if (result) {
                console.log('Data change successfully')
              } else {
                console.log('Data change failed')
              }
            } catch (e) {
              // statements
              console.log(e)
            }
          })
          resolve(returnInfo(CRAWLER.CRAWL_DATA_SUCCESS))
        },
        async exit(code) {
          console.log(code)
        },
        async error(err) {
          console.log(err)
          reject(returnInfo(CRAWLER.CRAWL_DATA_FAILED), err.message)
        }
      })
    })
  }

  async crawlCollection(ctx, next) {
    ctx.body = await new Promise((resolve, reject) => {
      startProcess({
        file: 'collection',
        async message(data) {
          console.log(data)
          data.forEach(async (item) => {
            try {
              if (item.posterUrl && !item.posterImgKey) {
                const picData = await qiniuUploads({
                  url: item.posterUrl,
                  bucket: qiniu.bucket.tximg.bucket_name,
                  dirName: 'crawled-img/',
                  ext: '.jpg'
                })
                if (picData.key) {
                  item.posterImgKey = picData.key
                }
              }

              const result = await addCollection(item)

              if (result) {
                console.log('Data change successfully')
              } else {
                console.log('Data change failed')
              }
            } catch (e) {
              // statements
              console.log(e)
            }
          })
          resolve(returnInfo(CRAWLER.CRAWL_DATA_SUCCESS))
        },
        async exit(code) {
          console.log(code)
        },
        async error(err) {
          console.log(err)
          reject(returnInfo(CRAWLER.CRAWL_DATA_FAILED), err.message)
        }
      })
    })
  }

  async crawlTeacher(ctx, next) {
    ctx.body = await new Promise((resolve, reject) => {
      startProcess({
        file: 'teacher',
        async message(data) {
          console.log(data)
          data.forEach(async (item) => {
            try {
              if (item.profilePic && !item.profilePicKey) {
                const picData = await qiniuUploads({
                  url: item.profilePic,
                  bucket: qiniu.bucket.tximg.bucket_name,
                  dirName: 'crawled-img/',
                  ext: '.jpg'
                })
                if (picData.key) {
                  item.profilePicKey = picData.key
                }
              }

              const result = await addTeacher(item)

              if (result) {
                console.log('Data change successfully')
              } else {
                console.log('Data change failed')
              }
            } catch (e) {
              console.log(e)
            }
          })
          resolve(returnInfo(CRAWLER.CRAWL_DATA_SUCCESS))
        },
        async exit(code) {
          console.log('子进程结束:', code)
        },
        async error(err) {
          console.log('子进程错误:', err)
          reject(returnInfo(CRAWLER.CRAWL_DATA_FAILED), err.message)
        }
      })
    })
  }

  async crawlStudent(ctx, next) {
    ctx.body = await new Promise((resolve, reject) => {
      startProcess({
        file: 'student',
        async message(data) {
          console.log(data)
          data.forEach(async (item) => {
            try {
              if (item.studentImg && !item.studentImgKey) {
                const picData = await qiniuUploads({
                  url: item.studentImg,
                  bucket: qiniu.bucket.tximg.bucket_name,
                  dirName: 'crawled-img/',
                  ext: '.jpg'
                })
                if (picData.key) {
                  item.studentImgKey = picData.key
                }
              }

              const result = await addStudent(item)

              if (result) {
                console.log('Data change successfully')
              } else {
                console.log('Data change failed')
              }
            } catch (e) {
              console.log(e)
            }
          })
          resolve(returnInfo(CRAWLER.CRAWL_DATA_SUCCESS))
        },
        async exit(code) {
          console.log('子进程结束:', code)
        },
        async error(err) {
          console.log('子进程错误:', err)
          reject(returnInfo(CRAWLER.CRAWL_DATA_FAILED), err.message)
        }
      })
    })
  }

  async crawlCourseTab(ctx, next) {
    ctx.body = await new Promise((resolve, reject) => {
      startProcess({
        file: 'courseTab',
        async message(data) {
          console.log(data)
          data.forEach(async (item) => {
            try {
              const result = await addCourseTab(item)

              if (result) {
                console.log('Data change successfully')
              } else {
                console.log('Data change failed')
              }
            } catch (e) {
              console.log(e)
            }
          })
          resolve(returnInfo(CRAWLER.CRAWL_DATA_SUCCESS))
        },
        async exit(code) {
          console.log('子进程结束:', code)
        },
        async error(err) {
          console.log('子进程错误:', err)
          reject(returnInfo(CRAWLER.CRAWL_DATA_FAILED), err.message)
        }
      })
    })
  }

  async crawlCourse(ctx, next) {
    ctx.body = await new Promise((resolve, reject) => {
      startProcess({
        file: 'course',
        async message(data) {
          console.log(data)
          data.forEach(async (item) => {
            try {
              if (item.posterUrl && !item.posterKey) {
                const picData = await qiniuUploads({
                  url: item.posterUrl,
                  bucket: qiniu.bucket.tximg.bucket_name,
                  dirName: 'crawled-img/',
                  ext: '.jpg'
                })
                if (picData.key) {
                  item.posterKey = picData.key
                }
              }
              // console.log('vvvvvvvvvvvv:', item)
              const result = await addCourse(item)

              if (result) {
                console.log('Data change successfully')
              } else {
                console.log('Data change failed')
              }
            } catch (e) {
              console.log(e)
            }
          })
          resolve(returnInfo(CRAWLER.CRAWL_DATA_SUCCESS))
        },
        async exit(code) {
          console.log('子进程结束:', code)
        },
        async error(err) {
          console.log('子进程错误:', err)
          reject(returnInfo(CRAWLER.CRAWL_DATA_FAILED), err.message)
        }
      })
    })
  }

  async crawlAbout(ctx, next) {
    ctx.body = await new Promise((resolve, reject) => {
      startProcess({
        file: 'about',
        async message(data) {
          console.log(data)

          if (data.poseterUrl && !data.posterKey) {
            try {
              const imgData = await qiniuUploads({
                url: data.poseterUrl,
                bucket: qiniu.bucket.tximg.bucket_name,
                dirName: 'crawled-img/',
                ext: '.jpg'
              })

              if (imgData.key) {
                data.posterKey = imgData.key
              }
              console.log(data)
              const result = await addAbout(data)

              if (result) {
                console.log('Data change successfully')
              } else {
                console.log('Data change failed')
              }
            } catch (error) {
              console.log(error)
            }
          }
          resolve(returnInfo(CRAWLER.CRAWL_DATA_SUCCESS))
        },
        async exit(code) {
          console.log(code)
        },
        async error(err) {
          console.log(err)
          reject(returnInfo(CRAWLER.CRAWL_DATA_FAILED), err.message)
        }
      })
    })
  }

  /**
   * depreciated
   */
  crawlAction(ctx, next) {
    const { api } = ctx.request.body
    console.log('this:', this) //undefined
    return Crawler.prototype[api]().then(
      (res) => {
        ctx.body = res
      },
      (err) => {
        ctx.body = err
      }
    )
    /** 或者直接
     * try {
     *    const result = Crawler.prototype[api]()
     *    ctx.body = result
     * }catch(e){
     *    ctx.body = e.message
     * }
     *
     */
  }
}

module.exports = new Crawler()
