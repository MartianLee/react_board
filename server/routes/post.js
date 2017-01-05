import express from 'express';
import mongoose from 'mongoose';

import Post from '../models/post';

const router = express.Router();

/*
    GET POST LIST: GET /board/list/page=1
    BODY SAMPLE: { ["post_id" : 1,
                  "title": "test",
                  "contents" : "test";
                  "writer": "asdf"
                  "time": "2017/01/04 03:00"
                }
    ERROR CODES:
        1: NO POST IN LIST
*/

// WRITE POST
router.post('/post', (req, res) => {
    // CHECK TITLE VALID
    console.log(req.body.post);
    if(typeof req.body.post.title !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if(req.body.post.title === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }
    // CHECK CONTENTS VALID
    if(typeof req.body.post.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if(req.body.post.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }
    //I want to make post_id incremently
    let c = Post.find()
      .sort({"_id": -1})
      .limit(1).pretty();
    let updateVal = c.post_id+1;
    //console.log(c);
    // CREATE NEW POST
    let postInfo = new Post({
        writer: req.body.post.writer,
        title: req.body.post.title,
        contents: req.body.post.contents,
    });

    // SAVE IN DATABASE
    postInfo.save( err => {
        if(err) throw err;
        return res.json({ success: true });
    });
});

// MODIFY POST
router.put('/update/:id', (req, res) => {
  // CHECK POST ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK TITLE VALID
    if(typeof req.body.title !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if(req.body.title === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CHECK CONTENTS VALID
    if(typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if(req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }


    // FIND POST
    Post.findById(req.params.id, (err, post) => {
        if(err) throw err;

        // IF post DOES NOT EXIST
        if(!post) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 4
            });
        }

        // MODIFY AND SAVE IN DATABASE
        post.title = req.body.title;
        post.contents = req.body.contents;
        post.date.edited = new Date();
        post.is_edited = true;

        post.save((err, post) => {
            if(err) throw err;
            return res.json({
                success: true,
                post
            });
        });

    });
});

// DELETE POST
router.delete('/delete/:id', (req, res) => {
  // CHECK POST ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // FIND POST AND CHECK FOR WRITER
    Post.findById(req.params.id, (err, post) => {
        if(err) throw err;

        if(!post) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }

        // REMOVE THE POST
        Post.remove({ _id: req.params.id }, err => {
            if(err) throw err;
            res.json({ success: true });
        });
    });
});

// GET POST LIST
router.get('/list/page=:page', (req, res) => {
  var c = Post.find()
    .sort({"_id": -1})
    .limit(10)
    .exec((err, posts) => {
        if(err) throw err;
        res.json(posts);
    });
    /*
  var count = c.count();
  var i = c.count();
  while(c.hasNext()){
    var now = c.next();
    Post.update(
      {"_id":now._id},
      {"$set":{"post_id":i}}
    );
    i--;
  }
  */
});

// GET POST
router.get('/view/:id', (req, res) => {
  /*
  var findVal = req.params.id*=-1;
  Post.find()
    .sort({"_id": -1})
    .limit(1)
    .exec((err, posts) => {
        if(err) throw err;
        res.json(posts);
    });
*/
    // FIND POST
    Post.findById(req.params.id, (err, post) => {
        if(err) throw err;

        // IF post DOES NOT EXIST
        if(!post) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 4
            });
        }

        post.save((err, post) => {
            if(err) throw err;
            return res.json({
                post
            });
        });

    });
});


export default router;
