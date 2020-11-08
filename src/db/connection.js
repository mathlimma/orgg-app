const { resolveConfigFile } = require('prettier');
const { func } = require('prop-types');

const sqlite3 = require('sqlite3').verbose();

module.exports = {
    // Functions Orgg DB
    openConnectionDB: function () {
        let db = new sqlite3.Database('./orgg-database.db', (err) => {
            if (err) {
                console.log(err.message);
            }
        
            console.log('Conectado ao orgg-database.');
        });
    
        return db;
    },
    closeConnectionDB: function (db) {
        db.close((err) => {
            if (err) {
                console.log(err.message);
            }
        
            console.log('Desconectado do orgg-database.');
        });
    },
    createDB: function (tasks) {
        db.run("CREATE TABLE if not exists tasks (name VARCHAR2(50) NOT NULL UNIQUE, estimate INT NOT NULL)");
        const stmt = db.prepare("INSERT INTO tasks (name, estimate) VALUES (?,?)");
    
        for (const t of tasks) {
            stmt.run(t.name, t.estimate, function(err){
                if (err) {
                    //console.log(err.message);
                }
            });
        }
    
        stmt.finalize();    
    },
    // Functions Users
    getEstimate: async function(name) {
        return new Promise((resolve, reject) => {
            db.get("SELECT estimate FROM tasks WHERE name = ?", name, function (err, row) {
                console.log(row);
                if (err) {
                    console.log(err.message);
                    reject(err);
                } else if (row === undefined) {
                    resolve(60); // Fix: set a better value
                } else {
                    resolve(row.estimate);
                }
            });
        })
    },
    insertTask: function(task_name) {
        db.run("CREATE TABLE if not exists user_tasks (name VARCHAR2(50) NOT NULL UNIQUE, estimate INT NOT NULL)");
        const stmt = db.prepare("INSERT INTO user_tasks (name, estimate) VALUES (?,?)");
        
        this.getEstimate(task_name).then((estimate) => {
            stmt.run(task_name, estimate, function(err) {
                if (err) {
                    //console.log(err.message);
                }
            });

            stmt.finalize();
        }).catch((err) => {
            console.log(err.message);
        });
    },
    removeTask: function(task_name) {
        db.run("DELETE FROM user_tasks WHERE name = ?", task_name);
    },
    updateTask: function(task) {

    },
    getRows: async function() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM user_tasks", function (err, rows) {
                if (err){
                    console.log(err.message);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },
    getAllTasks: async function() {
        //return this.getRows();
                
    /*    this.getRows().then((rows) => {
            return rows;
        }).catch((err) => {
            console.log(err.message);
        });
    */
    }
};