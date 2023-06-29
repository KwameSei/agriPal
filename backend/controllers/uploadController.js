export const uploadImage = async (req, res) => {
  try {
    const { picture } = req.body;
    console.log(picture);

    if (!picture) {
      return res
        .status(400)
        .json({ success: false, message: 'Image file is required' });
    } else {
      return res
        .status(200)
        .json({ success: true, message: 'Image file uploaded successfully' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};