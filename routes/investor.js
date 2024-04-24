const express = require("express");


const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const errorHandler = require("../handlers/error");
const authMiddleWare = require("../middlewares/auth");
const investorRepo = require("../repositories/investor");
const {paginate} = require("../utils/paginate")
const moment = require("moment");

const upload = multer({ dest: 'uploads/' });
const router = express.Router();





/* create new investor. */
router.post("/",authMiddleWare.user,async (req, res) => {
  try {
    const {firmName, name, email, phoneNumber, size,companyId} = req.body;

   let data = await investorRepo.create({
      name,
      firmName,
      email, 
      phoneNumber,
      size,
      companyId
    })
    res.status(200).json({ data, success:true});
  } catch (error) {
    errorHandler(error, res);
  }
});


//Get investors by companyId
router.get("/",authMiddleWare.user,async (req, res) => {
  let {companyId} = req.query
  try {

    const data = await investorRepo.find({companyId});
    console.log(data.length)
    res.status(200).json({ data, success:true});
  } catch (error) {
    errorHandler(error, res);
  }
});

router.post('/csv',authMiddleWare.user,upload.single('file'), async(req,res)=>{
  let companies =[];
  console.log(req.file.path);

  fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => companies.push(data))
      .on('end', async () => {
        try {
            // Insert the data into the database
            await Promise.all(companies.map(async (company) => {
                await investorRepo.create({
                  name : company.name,
                  firmName: company.firmName,
                  email: company.email, 
                  phoneNumber: company.phoneNumber,
                  size: company.size,
                  companyId: company.companyId
                })
            }));

            res.status(200).send('Data inserted successfully');
        } catch (err) {
            console.error('Error inserting data:', err);
            errorHandler(err, res);
          } finally {
            fs.unlinkSync(req.file.path); // Delete the uploaded file
        }
    });

  
});

module.exports = router;




