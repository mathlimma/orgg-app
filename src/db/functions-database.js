const fs = require('fs');

module.exports = {
    // Orgg database functions
    getDatabase: function() {
        return JSON.parse(fs.readFileSync('orgg-database.json'));
    },
    getAllOrggTasks: function() {
        const database = JSON.parse(fs.readFileSync('orgg-database.json'));
        
        return database['OrggDB'];
    },
    getOrggTask: function(name) {
        const database = this.getAllOrggTasks();

        for(var i = 0 ; i < database.length ; i++){
            if (database[i].Name.toLowerCase() == name.toLowerCase()) {
                return database[i];
            }
        }
        
        return null;
    },
    isExistsOrggTask: function(name) {
        if (this.getOrggTask(name) != null) {
            return true;
        } else {
            return false;
        }
    },
    getMediumOrggTasks: function() {
        var medium = 0;
        const database = this.getAllOrggTasks();

        for(var i = 0 ; i < database.length ; i++) {
            medium += database[i].EstimatedTime;
        }

        medium /= database.length;

        return Math.ceil(medium);
    },
    getEstimatedTimeOrggTask: function(name) {
        const orggTask = this.getOrggTask(name);

        if (orggTask != null) {
            return orggTask.EstimatedTime;
        } else {
            return this.getMediumOrggTasks();
        }
    },

    // User database functions
    getAllUserTasks: function() {
        const database = JSON.parse(fs.readFileSync('orgg-database.json'));
        
        return database['UserDB'];
    },
    getUserTask: function(name) {
        const database = this.getAllUserTasks();
        
        for(var i = 0 ; i < database.length ; i++){
            if (database[i].Name.toLowerCase() == name.toLowerCase()) {
                return database[i];
            }
        }
        
        return null;
    },
    isExistsUserTask: function(name) {
        if (this.getUserTask(name) != null) {
            return true;
        } else {
            return false;
        }
    },
    getEstimatedTimeUserTask: function(name) {
        const userTask = this.getUserTask(name);

        if (userTask != null) {
            return userTask.EstimatedTime;
        } else {
            return null;
        }
    },
    getPriorityUserTask: function(name) {
        const userTask = this.getUserTask(name);
        
        if (userTask != null) {
            return userTask.Priority;
        } else {
            return null;
        }
    },
    getTimeUsedUserTask: function(name) {
        const userTask = this.getUserTask(name);

        if (userTask != null) {
            return userTask.TimeUsed;
        } else {
            return null;
        }
    },
    getAllUserTasksByPriority: function(priority) {
        const databaseByPriority = [];
        const database = this.getAllUserTasks();

        for(var i = 0 ; i < database.length ; i++) {
            if (database[i].Priority == priority) {
                databaseByPriority.push(database[i]);
            }
        }

        if (databaseByPriority.length != 0) {
            return databaseByPriority;
        } else {
            return null;
        }
    },
    insertUserTask: function(name, priority) {
        if(!this.isExistsUserTask(name)) {
            const database = this.getDatabase();

            let task = {
                "Name": name,
                "EstimatedTime": this.getEstimatedTimeOrggTask(name),
                "Priority": priority,
                "TimeUsed": 0
            };

            database['UserDB'][database['UserDB'].length] = task;
        
            fs.writeFileSync('orgg-database.json', JSON.stringify(database, null, 1));
        }
    },
    removeUserTask: function(name) {
        if(this.isExistsUserTask(name)) {
            const database = this.getDatabase();
            const newUserTasks = [];
        
            for (var i = 0 ; i < database['UserDB'].length ; i++) {
                if (database['UserDB'][i].Name.toLowerCase() != name.toLowerCase()) {
                    newUserTasks.push(database['UserDB'][i]);
                }
            }

            database['UserDB'] = newUserTasks;

            fs.writeFileSync('orgg-database.json', JSON.stringify(database, null, 1));
        }
    },
    updateUserTask: function(name, updateTask) {
        if(this.isExistsUserTask(name)) {
            const database = this.getDatabase();

            for (var i = 0 ; i < database['UserDB'].length ; i++) {
                if (database['UserDB'][i].Name.toLowerCase() == name.toLowerCase()) {
                    database['UserDB'][i] = updateTask;
                    break;
                }
            }

            fs.writeFileSync('orgg-database.json', JSON.stringify(database, null, 1));
        }
    }
}