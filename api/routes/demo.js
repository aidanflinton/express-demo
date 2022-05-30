const express = require('express');
const router = express.Router();
const db = require("../firebase");

const { doc, addDoc, collection, getDocs, updateDoc, increment } = require('firebase/firestore');

const addMessage = (message) => {

        const newMessage = {
            user: message.name,
            message: message.msg,
            likes: 0,
            msgID: 3,
        }
        
        addDoc(collection(db, "messages"), newMessage) // add the new response 
    }

router.get("/info", async (req, res, next) => {
  const allDocData = []
  const docs = await getDocs(collection(db, "messages"))
  docs.forEach((doc) => allDocData.push({doc_id:doc.id, ...doc.data()}))
  res.json({result: allDocData})
});

router.post('/post', (req, res, next) => {
    db.collection('messages').add({
        user: req.body.user,
        message: req.body.msg
    })

    .then(console.log(req.body))
    .then(res.send(req.body))
});

router.put('/like', (req, res, next) => {

    console.log(req.body)
    .then(res.send('Received a like request'))
});

router.delete('/delete', (req, res, next) => {
    console.log(req.body);
    res.send('Received a delete request');
});

module.exports = router;

/*
 updateDoc(doc(db, "messages", id), {
      likes: increment(1)  // increment is a built-in firestore function that increments by the number specified
    })
*/