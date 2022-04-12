const getRoot = (req, res) => {
    i = 100;
    if (process.env['NODE_ENV'] === 'production') {
        res.status(200).send();
    }
    else {
        res.json({ 'NODE_ENV': process.env['NODE_ENV'] ?? 'undefined' });
    }
}

export default getRoot;