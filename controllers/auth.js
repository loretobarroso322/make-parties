
// auth.js controller
const jwt = require('jsonwebtoken');

function generateJWT(user) {
  const mpJWT = jwt.sign({ id: user.id }, "AUTH-SECRET", { expiresIn: 60*60*24*60 });

  return mpJWT
}

module.exports = function (app, models) {

  //SIGN UP GET
  app.get('/sign-up', (req, res) => {
    res.render('sign-up.handlebars', {});
  })


  //SIGN UP POST
  app.post('/sign-up', (req, res) => {
    models.User.create(req.body).then(user => {
      // after creating the user
      const mpJWT = generateJWT(user)
      // save as cookie
      res.cookie("mpJWT", mpJWT)
      res.redirect('/')
    }).catch((err) => {
      console.log(err)
    });
  })

  //LOGIN POST
  app.post('/login', (req, res) => {
    models.User.create(req.body).then(user => {
      res.redirect(`/login/${user.id}`)
    }).catch((err) => {
      console.log(err)
    });
  })

  //LOGIN GET
  app.get('/login', (req, res) => {
    res.render('login', {});
  })

}
