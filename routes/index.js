var express = require('express')
const Students = require('../models/student')
const Book = require('../models/book')
var router = express.Router()
router.get('/lms',function(req,res){
  res.render('index')
})
router.post('/selection',(req,res) => {
  const selectedOption = req.body.selection;

  switch(selectedOption){
    case 'New Student Registration':
      res.render('newstd');
      break;
    case 'Add New Book':
      res.render('newbook');
      break;
    case 'View Stock Of Books':
      res.redirect('lms/viewbook');
      break;
    case "Issue":
      res.redirect('/showbook');
      break;
    case 'View Registered Students':
      res.redirect('lms/viewstd');
      break;


    default:
      res.send("Invalid Selection")

  }
  
});

router.post('/newstd',async function(req,res) {
  const data = await Students.create({
    name:req.body.std_name,
    course:req.body.course
  })
  data.save;
  const htmlResponse = `
        <html>
          <body>
            <p> Student Registered Succesfully</p>
            <p>Redirecting to the operation selection  page...</p>
            <script>
              setTimeout(function() {
                window.location.href = '/';
              }, 2000);
            </script>
          </body>
        </html>
      `;
      res.send(htmlResponse);
  });

router.post('lms/newbook',async function(req,res) {
  const data1 = await Book.create({
    book_name:req.body.b_name,
    stream:req.body.stream,
    author:req.body.author,
    num:req.body.num
  })
  data1.save;
  const htmlResponse = `
        <html>
          <body>
            <p> Book Added Succesfully</p>
            <p>Redirecting to the operation selection  page...</p>
            <script>
              setTimeout(function() {
                window.location.href = '/';
              }, 2000);
            </script>
          </body>
        </html>
      `;

      res.send(htmlResponse);
  });

router.get('/viewbook',async function(req, res)  {
  const books = await Book.find({})
  res.render('viewbook',{books: books })
  });
router.get('/viewstd',async function(req, res)  {
  const student1 = await Students.find({})
  res.render('viewstd',{student1: student1 })
  });

router.get('lms/showbook',async function(req, res){
  const data2 = await Book.find({})
  res.render('issue',{data2: data2 })
  });

  router.post('/selbook', async function (req, res) {
    const selectedBooks = req.body.selectedBooks;
    const selectedBookIds = Array.isArray(selectedBooks) ? selectedBooks : [selectedBooks];
    for (const bookId of selectedBookIds) {
      const selbook = await Book.findById(bookId);
      if (selbook) {
        selbook.num--;
        await selbook.save();
      }
    }
    res.redirect('lms/showstd');
  });
  
  router.get('/showstd',async function(req,res){
    const student2 = await Students.find({})
    res.render('showstd',{student2:student2})
  });
  router.post('/selstd', async function (req, res) {
    const selectedid = req.body.selectedstudents;
    const selstd = await Students.findById(selectedid);
  
    if (selstd) {
      selstd.books_issued++;
      await selstd.save();
      res.send('Book Issued');
    } else {
      res.send('Student not found');
    }
  });
  
module.exports = router;
