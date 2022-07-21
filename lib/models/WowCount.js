module.exports = (mongoose) => {
  const WowCount = mongoose.model(
    'wowCount',
    mongoose.Schema(
      { 
        _id: Number,
        count: Number,
      },
      { collection: 'wowcount' }
    )
  );
  return WowCount;
};
