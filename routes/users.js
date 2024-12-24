import express from 'express';
const router = express.Router();

import { updateUserInDb, newPhoneInDb, getUserByID, deleteUserById } from '../lib/db-handler.js'

router.route('/user/:id/update')
  .get(async (req, res) => {
    const userData = await getUserByID(req.params.id)
    const data = { user: userData }
    res.render('users/update', data)
  })
  .post(async (req, res) => {
    const data = req.body;
    updateUserInDb(data.firstName, data.lastName, data.phone, req.params.id);
    res.redirect('/')
  })


router.get('/user/:id/delete', async (req, res) => {
  await deleteUserById(req.params.id);
  res.redirect('/')
})

router.route('/new')
  .get((req, res) => {
    res.render('users/new')
  })
  .post((req, res) => {
    const data = req.body;
    newPhoneInDb(data.firstName, data.lastName, data.phone);
    res.redirect('/')
  })

router.route('/:id')
  .get(async (req, res) => {
    const userData = await getUserByID(req.params.id)
    const data = { user: userData }
    res.render('users/details', data)
  })
  .put((req, res) => {
    res.send(`Get User ${req.params.id}`)
  })
  .delete((req, res) => {
    res.send(`Get User ${req.params.id}`)
  })

export default router
