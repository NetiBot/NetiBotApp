module.exports = (mongoose) => {
  const Webmd = mongoose.model(
    'Webmd',
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
