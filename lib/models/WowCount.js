module.exports = (mongoose) => {
  const WowCount = mongoose.model(
    'wowCount',
    mongoose.Schema(
      {
        count: Number,
      },
      { collection: 'wowcount' }
    )
  );
  return WowCount;
};
