import express, { Express, Request, Response }  from "express";
const router = express.Router();

/* GET home page. */
router.get('/', async function(req: Request, res: Response, next:any) {
    setImmediate(() => {
        try {
            res.status(200).json({
                status: true,
                mss: "Hello, world",
                data: {name: "John", last_name:"Abc", phone:123456879}
            })
        } catch (e) {
          res.status(400).json({
            status: false,
            mss: e,
            data: {}
        })
        }
      })
});

module.exports = router;
