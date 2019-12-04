/* eslint-disable no-underscore-dangle */
const { lostItemsModel: LostItems } = require('../../models');

const getLostItems = (_, { id, limit, state, offset }) => {
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
  } else if (state) {
    return LostItems.find({ state });
  } else if (offset && limit && state) {
    return LostItems.find({ state })
      .skip(offset)
      .limit(limit);
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
