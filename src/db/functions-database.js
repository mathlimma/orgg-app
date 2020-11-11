const database = require('./orgg-database.json');

module.exports = {
    // Orgg database functions
    getOrggTask: function(name) {
        for(var i = 0 ; i < database['OrggDB'].length ; i++){
            if (database['OrggDB'][i].Name.toLowerCase() == name.toLowerCase()) {
                return database['OrggDB'][i];
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
    getEstimatedTimeOrggTask: function(name) {
        const orggTask = this.getOrggTask(name);
        if (orggTask != null) {
            return orggTask.EstimatedTime;
        } else {
            return null;
        }
    },
    getAllOrggTasks: function() {
        return database['OrggDB'];
    },
    getMediumOrggTasks: function() {
        var medium = 0;
        for(var i = 0 ; i < database['OrggDB'].length ; i++) {
            medium += database['OrggDB'][i].EstimatedTime;
        }

        medium /= database['OrggDB'].length;

        return Math.ceil(medium);
    },

    // User database functions
    getUserTask: function(name) {
        for(var i = 0 ; i < database['UserDB'].length ; i++){
            if (database['UserDB'][i].Name.toLowerCase() == name.toLowerCase()) {
                return database['UserDB'][i];
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
    getAllUserTasks: function() {
        return database['UserDB'];
    },
    getAllUserTasksByPriority: function(priority) {
        const databaseByPriority = [];

        for(var i = 0 ; i < database['UserDB'].length ; i++) {
            if (database['UserDB'][i].Priority == priority) {
                databaseByPriority.push(database['UserDB'][i]);
            }
        }

        if (databaseByPriority.length != 0) {
            return databaseByPriority;
        } else {
            return null;
        }
    },
    insertUserTask: function(task) {

    },
    removeUserTask: function(name) {

    },
    updateUserTask: function(task) {

    }
}