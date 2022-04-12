const fourOhFour = (req, res, next) => {
    res.status(404).json({message: "not found"})
};

export default fourOhFour