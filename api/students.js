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
  try {
    queries.getAllstudent().then(students => {
      res.json(students);
    });
  } catch (error) {
    res.json(error);
  }
});

router.get('/student/:id', isValidId, (req, res, next) => {
  try {
    queries.getOnestudent(req.params.id).then(student => {
      if (student) {
        res.json(student);
      } else {
        next();
      }
    });
  } catch (error) {
    res.json(error);
  }
});

router.post('/student/', (req, res, next) => {
  try {
    if (validstudent(req.body)) {
      queries.createstudent(req.body).then(students => {
        res.json(students[0]);
      });
    } else {
      next(new Error('Invalid student'));
    }
  } catch (error) {
    res.json(error);
  }
});

router.put('/student/:id', isValidId, (req, res, next) => {
  try {
    if (validstudent(req.body)) {
      queries.updatestudent(req.params.id, req.body).then(students => {
        res.json(students[0]);
      });
    } else {
      next(new Error('Invalid student'));
    }
  } catch (error) {
    res.json(error);
  }
});

router.delete('/student/:id', isValidId, (req, res) => {
  try {
    queries.deletestudent(req.params.id).then(() => {
      res.json({
        deleted: true
      });
    });
  } catch (error) {
    res.json(error);
  }
});

router.get('/studentcount', (req, res) => {
  try {
    queries.countstudent().then((count_student) => {
      res.json(count_student)
    })
  } catch (error) {
    res.json(error);
  }
});
// Student Routes End

// Books Routes Start

router.get('/book/', (req, res) => {
  try {
    queries.getAllbook().then(books => {
      res.json(books);
    });
  } catch (error) {
    res.json(error);
  }
});

router.get('/book/:id', isValidId, (req, res, next) => {
  try {
    queries.getOnebook(req.params.id).then(book => {
      if (book) {
        res.json(book);
      } else {
        next();
      }
    });
  } catch (error) {
    res.json(error);
  }
});

router.post('/book/', (req, res, next) => {
  try {
    if (validbook(req.body)) {
      queries.createbook(req.body).then(book => {
        res.json(book[0]);
      });
    } else {
      next(new Error('Invalid student'));
    }
  } catch (error) {
    res.json(error);
  }
});

router.put('/book/:id', isValidId, (req, res, next) => {
  try {
    if (validbook(req.body)) {
      queries.updatebook(req.params.id, req.body).then(book => {
        res.json(book[0]);
      });
    } else {
      next(new Error('Invalid book'));
    }
  } catch (error) {
    res.json(error);
  }
});

router.delete('/book/:id', isValidId, (req, res) => {
  try {
    queries.deletebook(req.params.id).then(() => {
      res.json({
        deleted: true
      });
    });
  } catch (error) {
    res.json(error);
  }
});

router.get('/bookcount', (req, res) => {
  try {
    queries.countbook().then(count => {
      res.json(count)
    })
  } catch (error) {
    res.json(error);
  }
});
// Student Routes End





module.exports = router;
