const register = (req, res, next) => {
    console.log(req.body);
    res.send("hello body")
}

export {register};