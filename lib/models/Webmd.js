module.exports = (mongoose) => {
  const Webmd = mongoose.model(
    'webmd',
    mongoose.Schema(
      {
        title: String,
        description: String,
        published: Boolean,
      },
      { timestamps: true }
    )
  );
  return Webmd;
};
