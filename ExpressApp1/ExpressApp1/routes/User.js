const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const UserController = require('/Nodejs/Nodejs_backend/ExpressApp1/ExpressApp1/Controllers/UserController');


/* -------------------------------------UER---------------------------------------------------------------------- */
// a simple test url to check that all of our files are communicating correctly.
router.get('/Load_List', UserController.Load_List);
router.post('/Login', UserController.Login);
router.post('/Insert', UserController.Insert);
router.post('/Update', UserController.Update);
router.get('/Delete/:id', UserController.Delete);

module.exports = router;

