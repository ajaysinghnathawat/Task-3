 const express=require('express');
 const app=express();
 
 app.use(express.json());

// Array of Objects (Books) 
let allBooks = [
  {
    id:  1,
    title: 'Lucifer',  
    author: 'John Doe',
},
  {
    id: 2,
    title: 'The Great war',  
    author: 'Jane Smith',
},
  {
    id: 3,
    title: 'The Last Battle',  
    author: 'Alice Johnson',
},
  {
    id: 4,
    title: 'Nuclear war',  
    author: 'Bob Brown',
}
];

// Handling Request 3000
app.get('/',(req,res)=>{
    res.send('Welcom to the book store page')
 })

// Handling  get/books
 app.get('/books',(req,res)=>{
   console.log("inside the books get request");
   res.json(allBooks);
 })

 // Handling post/books
 app.post('/books',(req,res)=>{
    console.log("inside the books post request");
    console.log(req.body);
    const{  title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author both are require ' });
    }

    const newBook = {
        id: allBooks.length + 1,
        title,
        author
    };
    allBooks.push(newBook);
    res.status(201).json(newBook);
 })

//handing Put request
 app.put('/books/:id',(req,res)=>{
    console.log("inside the books put request");
    const id = parseInt(req.params.id);
    const { title, author } = req.body;

    const bookIndex = allBooks.findIndex(book=> book.id === id);
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author both are require ' });
    }
    allBooks[bookIndex] = { id, title, author };
    res.json(allBooks[bookIndex]);
 })

// Handing the delete request

app.delete("/books/:id",(req,res)=>{
  console.log("inside the books delete request");
  const id=parseInt(req.params.id);
  const bookIndex = allBooks.findIndex((book)=>book.id === id);

  if(bookIndex==-1){
    return res.status(404).json({error:"Book not found"})
  }
  allBooks=allBooks.filter((book)=>book.id !== id)
  res.status(204).end();
})


// Handling an unexpected request
 app.use((req, res, next)=>{
    res.status(404).send(`<h1> <b> <center> 404 Page Not Found </center></b></h1>`);
    next();
 })
 
const PORT=3000;
 app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
 })


