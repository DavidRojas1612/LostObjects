/* eslint-disable no-underscore-dangle */
const { lostItemsModel: LostItems } = require('../../models');

const getLostItems = (_, { id, limit }) => {
  if (id) {
    return new Promise((resolve, reject) => {
      LostItems.findById(id, (err, item) => {
        if (err) {
          reject(err);
        } else {
          resolve([item]);
        }
      });
    });
  } else if (limit) {
    return LostItems.find({}).limit(limit);
  }
  return LostItems.find({});
};

const createLostItem = (_, { lostItem }) => {
  const newLostItem = new LostItems({
    description: lostItem.description,
    state: lostItem.state,
    userInfoStateLost: lostItem.userInfoStateLost,
    userInfoStateDelivered: lostItem.userInfoStateDelivered,
    images: lostItem.images
  });
  newLostItem.id = newLostItem._id;
  return new Promise((resolve, reject) => {
    newLostItem.save(err => {
      if (err) {
        reject(err);
      } else {
        // pubsub.publish(CUSTOMER_ADDED, { customerAdded: newLostItem });
        resolve(newLostItem);
      }
    });
  });
};

module.exports = {
  Query: {
    lostItems: getLostItems
  },
  Mutation: {
    createLostItem
  }
};

// Subscription: {
//   onLogin: {
//     subscribe: userLoggedIn.iter
//   }
// }
