const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

function validstudent(student) {
  const hasfirstname = typeof student.first_name == 'string' && student.first_name.trim() != '';
  const haslastname = typeof student.last_name == 'string' && student.last_name.trim() != '';
  return hasfirstname && haslastname;
}

function validbook(book) {
  const has_bookname = typeof book.book_name == 'string' && book.book_name.trim() != '';
  const has_author = typeof book.author == 'string' && book.author.trim() != '';
  const has_borrowed_by_student = typeof book.borrowed_by_student == 'string' && book.borrowed_by_student.trim() != '';
  const has_date_of_borrow = typeof book.date_of_borrow == 'string' && book.date_of_borrow.trim() != '';
  const has_expected_date_return = typeof book.expected_date_return == 'string' && book.expected_date_return.trim() != '';
  return has_bookname && has_author && has_borrowed_by_student && has_date_of_borrow && has_expected_date_return;
}


// Student Routes Start
router.get('/student/', (req, res) => {
  queries.getAllstudent().then(students => {
    res.json(students);
  });
});

router.get('/student/:id', isValidId, (req, res, next) => {
  queries.getOnestudent(req.params.id).then(student => {
    if (student) {
      res.json(student);
    } else {
      next();
    }
  });
});

router.post('/student/', (req, res, next) => {
  if (validstudent(req.body)) {
    queries.createstudent(req.body).then(students => {
      res.json(students[0]);
    });
  } else {
    next(new Error('Invalid student'));
  }
});

router.put('/student/:id', isValidId, (req, res, next) => {
  if (validstudent(req.body)) {
    queries.updatestudent(req.params.id, req.body).then(students => {
      res.json(students[0]);
    });
  } else {
    next(new Error('Invalid student'));
  }
});

router.delete('/student/:id', isValidId, (req, res) => {
  queries.deletestudent(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});
// Student Routes End

// Books Routes Start

router.get('/book/', (req, res) => {
  queries.getAllbook().then(books => {
    res.json(books);
  });
});

router.get('/book/:id', isValidId, (req, res, next) => {
  queries.getOnebook(req.params.id).then(book => {
    if (book) {
      res.json(book);
    } else {
      next();
    }
  });
});

router.post('/book/', (req, res, next) => {
  if (validbook(req.body)) {
    queries.createbook(req.body).then(book => {
      res.json(book[0]);
    });
  } else {
    next(new Error('Invalid student'));
  }
});

router.put('/book/:id', isValidId, (req, res, next) => {
  if (validbook(req.body)) {
    queries.updatebook(req.params.id, req.body).then(book => {
      res.json(book[0]);
    });
  } else {
    next(new Error('Invalid book'));
  }
});

router.delete('/book/:id', isValidId, (req, res) => {
  queries.deletebook(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

// Student Routes End





module.exports = router;
