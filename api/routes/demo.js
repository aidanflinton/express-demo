const express = require('express');
const router = express.Router();
const db = require("../firebase");

const { doc, addDoc, collection, getDocs, updateDoc, deleteDoc, increment } = require('firebase/firestore');

router.get("/info", async (req, res, next) => {
  const allDocData = []
  const docs = await getDocs(collection(db, "messages"))
  docs.forEach((doc) => allDocData.push({doc_id:doc.id, ...doc.data()}))
  res.json({result: allDocData})
});

router.post('/post', (req, res, next) => {
    addDoc(collection(db, "messages"), {
        user:req.body.name,
        message: req.body.message,
        likes: 0
    })

    .then(console.log(req.body))
    res.send(req.body)
});

router.put('/like', (req, res, next) => {
    updateDoc(doc(db, "messages", req.body.id), {
      likes: increment(1)  // increment is a built-in firestore function that increments by the number specified
    })

    .then(console.log(req.body))
    res.send('Received a like request')
});

router.delete('/delete', (req, res, next) => {
    //deleteDoc(doc(db, 'messages', req.query.id))

    console.log(req.query);
    res.send('Received a delete request');
});

module.exports = router;

/*
 updateDoc(doc(db, "messages", id), {
      likes: increment(1)  // increment is a built-in firestore function that increments by the number specified
    })
*/