const express = require('express')
const expressHandlebars = require('express-handlebars')
const db = require('./database')
const session = require('express-session')

const minimumCharactersForRace = 2
const minimumCharactersForStats = 1
const minimumCharactersForDescription = 5

const app = express()
app.use(express.static('public'))

app.use(express.urlencoded({
    extended:true
}))

app.use(session({
    secret: "asdf",
    saveUninitialized: false,
    resave: false,
}))

function getValidationErrors(race, stats, description){
    const validationErrors = []

    if(race.length < minimumCharactersForRace){
        validationErrors.push("The name of the race needs to contain at least" +minimumCharactersForRace+ "characters")
    }

    if(stats.length < minimumCharactersForStats){
        validationErrors.push("The enemy needs at least" +minimumCharactersForStats+ " in their stat")
    }

    if(description.length < minimumCharactersForDescription){
        validationErrors.push("The enemy description must contain at least " +minimumCharactersForDescription+ " characters")
    }
    return validationErrors
}




app.post('/login', function(request, response){
    const username = request.body.username
    const password = request.body.password

    if(username == 'Joakim' && password == 'Gunnarsson'){
        request.session.isLoggedIn = true;

        response.redirect('/')
    }else{
        response.render('login.hbs')
    }
})
    


app.use('/static', express.static("public"))

app.engine("hbs", expressHandlebars({
    defaultLayout: 'main.hbs',
    extname: 'hbs',
    partialsDir:  './views/partials',
    layoutsDir: './views/layouts'
}))

app.use(function(request, response, next){

    response.locals.session = request.session
    next()
})

const admin_username = "Alice"
const admin_password = "abc123"



app.get('/', function(request, response){
    
    response.render("home.hbs", {})
})


app.get('/about', function(request, response){
    
    response.render("about.hbs", {})
})

app.get('/contact', function(request, response){
    
    response.render("contact.hbs")
})

const bodyParser = require('body-parser')
const { request } = require('express')


app.get('/character/create', function(request, response){
    response.render("createCharacter.hbs")
})

app.get('/enemy/create', function(request, response){
    response.render("createEnemy.hbs")
})


app.post('/character/create', function(request, response){
    const name = request.body.name
    const race = request.body.race
    const stats = request.body.stats

    const errors = getValidationErrors(name, race, stats)

        if(!request.session.isLoggedIn){
            errors.push("You need to be logged in to create a character!")
        }

        if(errors.length == 0){
        const query = "INSERT INTO warhammerCharacters (name, race, stats) VALUES (?, ?, ?)"
        const values = [name, race, stats]
        

            db.run(query, values, function(error){
                if(error){
                    errors.push("Internal server error.")

                    const model = {
                        errors, 
                        name,
                        race,
                        stats
                }
                response.render('createCharacter.hbs', model)
            }else{
                const id = this.lastID
                response.redirect('/character/view/'+id)
            }
        
        })
    }else{
        const model = {
            errors,
            name,
            race,
            stats
        }
        response.render('createCharacter.hbs', model)
}
    db.createWarhammerCharacter(race, stats, name, function(error){
        response.redirect('/character/view')
    })
})

app.get('/character/view', function(request, response){
    const name = request.body.name
    const race = request.body.race
    const stats = request.body.stats
    db.getWarhammerCharacters(function(error, warhammerCharacters){
        const model = {
            warhammerCharacters
        }
        response.render('viewCharacters.hbs', model)
    })
})

app.get('/character/:id/delete', function(request, response){
    const characterId = request.params.id
    const model = {
        characterId
    }
    response.render('deleteCharacter.hbs', model)
})

app.post('/character/:id/delete', function(request, response){
    const id = request.params.id

    db.deleteWarhammerCharacter(id, function(error){
        response.redirect('/character/view')
    })
})

app.get('/character/:id/update', function(request, response){
    const characterId = request.params.id
    db.getWarhammerCharacterById(characterId, function(error, warhammerCharacter){
        const model = {
            characterId,
            warhammerCharacter
        }
        response.render('updateCharacter.hbs', model)
    })
})

app.post('/character/:id/update', function(request, response){
    const id = request.params.id
    const name = request.body.name
    const race = request.body.race
    const stats = request.body.stats

    const errors = validators.get

    db.updateWarhammerCharacter(id, name, race, stats, function(error){
        response.redirect('/character/view')
    })
})

app.post('/enemy/create', function(request, response){
    const description = request.body.description
    const race = request.body.race
    const stats = request.body.stats
    

    db.createWarhammerEnemies(race, stats, description, function(error){
        response.render('viewEnemies.hbs')
    })
})

app.get('/enemy/view', function(request, response){
    const description = request.body.description
    const race = request.body.race
    const stats = request.body.stats
    db.getWarhammerEnemies(function(error, warhammerEnemies){
        const model = {
            warhammerEnemies
        }
        response.render('viewEnemies.hbs', model)
    })
})

app.get('/enemy/:id/delete', function(request, response){
    const enemyId = request.params.id
    const model = {
        enemyId
    }
    response.render('deleteEnemy.hbs', model)
})

app.post('/enemy/:id/delete', function(request, response){
    const id = request.params.id

    db.deleteWarhammerEnemy(id, function(error){
        response.redirect('/enemy/view')
    })
})

app.get('/enemy/:id/update', function(request, response){
    const enemyId = request.params.id
    db.getWarhammerEnemyById(enemyId, function(error, warhammerEnemy){
        const model = {
            enemyId,
            warhammerEnemy
        }
        response.render('updateEnemy.hbs', model)
    })
})

app.post('/enemy/:id/update', function(request, response){
    const id = request.params.id
    const race = request.body.race
    const stats = request.body.stats
    const description = request.body.description

    db.updateWarhammerEnemy(id, race, stats, description, function(error){
        response.redirect('/enemy/view')
    })
})

app.get('/login', function(request, response){
    response.render("login.hbs")
})

app.post('/login', function(request, response){
    const username = request.body.username
    const password = request.body.password

    if (username == admin_username && password == admin_password){
        request.session.isLoggedIn = true
        const model = {
            
        }
        response.redirect('home.hbs', model)
    }
})

app.listen(8080)