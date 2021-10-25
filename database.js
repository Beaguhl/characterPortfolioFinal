const sqlite = require('sqlite3');
const db = new sqlite.Database('database.db')
console.log("hello")
db.run(`
    CREATE TABLE IF NOT EXISTS warhammerEnemies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        race TEXT,
        stats INTEGER,
        description TEXT
    )
`)

db.run(`
    CREATE TABLE IF NOT EXISTS warhammerCharacters(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        race TEXT,
        stats INTEGER,
        name TEXT
    )
`)

/*const query = "INSERT INTO warhammerCharacters (race, stats, name) VALUES ('Human', '30', 'Conrad Krahl')"
db.run(query, function(error){

})*/

/*const query = "INSERT INTO warhammerEnemies (race, stats, description) VALUES ('Ogre', '24', 'A very common giant green creature')"
db.run(query, function(error){
})*/

exports.createWarhammerCharacter = function(race, stats, name, callback){
    const query = "INSERT INTO warhammerCharacters(race, stats, name) VALUES(?, ?, ?)"
    const values = [race, stats, name]

    db.run(query, values, function(error){
        callback(error)
    })
}

exports.deleteWarhammerCharacter = function(id, callback){
    const query = "DELETE FROM warhammerCharacters WHERE id = ?"
    const values = [id]

    db.run(query, values, function(error){
        callback(error)
    })
}

exports.createWarhammerEnemies = function(race, stats, description, callback){
    const query = "INSERT INTO warhammerEnemies (race, stats, description) VALUES (?, ?, ?)"
    const values = [race, stats, description]

    db.run(query, values, function(error){
        callback(error)
    })
}

exports.getWarhammerEnemiesById = function(id, callback){

    const query = "SELECT * FROM warhammerEnemies WHERE id = ? LIMIT 1"
    const values = [id]

    db.get(query, values, function(error, warhammerEnemies){
        callback(error, warhammerEnemies)
    })
}

exports.updateWarhammerEnemiesById = function(id, race, stats, description, callback){

    const query = "UPDATE warhammerEnemies SET race = ?, stats = ?, description = ? WHERE id = ?"
    const values = [race, stats, description, id]

    db.run(query, values, function(error){
        callback(error)
    })
}

exports.deleteWarhammerEnemiesById = function(id, callback){

    const query = "DELETE FROM warhammerEnemies WHERE id = ?"
    const values = [id]

    db.run(query, values, function(error){
        callback(error)
    })
}

exports.getWarhammerCharacters = function(callback){
    const query = "SELECT * FROM warhammerCharacters"

    db.all(query, function(error, warhammerCharacters){
        callback(error, warhammerCharacters)
    })
}

exports.getWarhammerCharacterById = function(id, callback){

    const query = "SELECT * FROM warhammerCharacters WHERE id = ? LIMIT 1"
    const values = [id]

    db.get(query, values, function(error, warhammerCharacter){
        callback(error, warhammerCharacter)
    })
}

exports.getWarhammerEnemies = function(callback){
    const query = "SELECT * FROM warhammerEnemies"

    db.all(query, function(error, warhammerEnemies){
        callback(error, warhammerEnemies)
    })
}

exports.updateWarhammerCharacter = function(id, name, race, stats, callback){
    const query = "UPDATE warhammerCharacters SET name = ?, stats = ?, race = ? WHERE id = ?"
    const values = [name, stats, race, id]

    db.run(query, values ,function(error){
        callback(error)
    })
}

exports.getWarhammerEnemyById = function(id, callback){

    const query = "SELECT * FROM warhammerEnemies WHERE id = ? LIMIT 1"
    const values = [id]

    db.get(query, values, function(error, warhammerEnemy){
        callback(error, warhammerEnemy)
    })
}

exports.deleteWarhammerEnemy = function(id, callback){
    const query = "DELETE FROM warhammerEnemies WHERE id = ?"
    const values = [id]

    db.run(query, values, function(error){
        callback(error)
    })
}

exports.updateWarhammerEnemy = function(id, race, stats, description, callback){
    const query = "UPDATE warhammerEnemies SET race = ?, stats = ?, description = ? WHERE id = ?"
    const values = [race, stats, description, id]

    db.run(query, values ,function(error){
        callback(error)
    })
}