module.exports = (mongoose) => {
  const Webmd = mongoose.model(
    'webmd',
    mongoose.Schema(
      {
        diagnosis: String,
        treatment: String,
      },
      { timestamps: true }
    )
  );
  return Webmd;
};
