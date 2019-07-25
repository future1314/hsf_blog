// 云函数入口文件
const cloud = require('wx-server-sdk')
// const _ = db.command
// return db.collection('posts_comments').doc(id).update({
//   data: {
//     childComment: _.push(data)
//   }
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  try {
    const _ = db.command
    return await db.collection('comment').doc(event._id).update({
      data: {
        childComment: _.push({
          avatarUrl: event.avatarUrl,
          nickName: event.nickName,
          openId: event.openId,
          comment: event.comment,
          createDate: event.createDate,
          flag: event.flag,
          opposite_avatarUrl: event.opposite_avatarUrl,
          opposite_nickName: event.opposite_nickName,
          opposite_openId: event.opposite_openId,
          timestamp: event.timestamp,
        })
      }
    }).then(res => {
      return res;
    })
  } catch (e) {
    console.error(e)
  }
}