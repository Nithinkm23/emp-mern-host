const express = require('express')
const router = express.Router();
const employeeData = require('../model/employeeData')
const auth = require('../auth/auth');
const jwt = require('jsonwebtoken');

router.use(express.json());
router.use(express.urlencoded({ extended: true }))

//VIEW ALL POST

router.get('api/viewall/:token', async (req, res) => {

    try {
        const data = await employeeData.find()
        jwt.verify(req.params.token, "empdata",
            (error, decoded) => {
                if (decoded && decoded.email) {
                    res.json(data)
                } else {
                    res.json({ message: "Unauthorised user!" })
                }

            })
    }
    catch (error) {
        res.json({ message: "Not Successful!" })

    }
})

//ADD POST

router.post('/api/addpost', auth, (req, res) => {
    try {
        const item = req.body;
        const newdata = new employeeData(item)
        jwt.verify(req.body.token, "empdata",
            (error, decoded) => {
                if (decoded && decoded.email) {
                    newdata.save();
                    res.json({ message:"Post added successfully!" })
                }
                else {
                    res.json({ message: "Unauthorised user!" })
                }
            })
    } catch (error) {
        console.log(error)
        res.json({ message: "Unable to Post!" })

    }
})
 
//DELETE POST 
 
router.delete("/api/delete/:id/:token/:role", auth,  (req, res) => {
    try { 
        const postId = req.params.id;
        console.log(postId)
        jwt.verify(req.params.token, "empdata",
            (error, decoded) => {
                if(decoded && decoded.email){
                 employeeData.findByIdAndDelete(postId).exec();
                res.json({ message: "Deleted Successfully" })
                }
                else{
                    res.json({message:"Unautorized User!"})
                }
        })
     
    } catch (error) {
        console.log(error);
        res.status(400).json('Unable to delete')
    }
});

router.put("/api/edit/:id", auth, async (req, res) => {
    try {

        console.log(req.body)
        const postId = req.params.id;
        console.log(postId)

        await employeeData.findByIdAndUpdate(postId, req.body)
        res.json({ message: "Updated Successfully!" })
    } catch (error) {
        console.log(error.message)
        res.status(400).json("Unable to Update!")
    }
});

module.exports = router;   