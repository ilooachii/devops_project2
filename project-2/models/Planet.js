const db = require('../models/db_conf');


module.exports.list = () => {
    return db.prepare("SELECT * FROM planets").all();
};

module.exports.save = (data) => {
    console.log("SAVE :" + JSON.stringify(data));

    // verify that a planet with the same name does not already exist
    const planet = db.prepare('SELECT * FROM PLANETS WHERE name = ?').get(data.name);
    if (planet) {
        console.log("planet model save" + planet);
        return false;
    }

    //verify that the size is positive and less than 10000
    if (data.size < 0 || data.size > 10000) {
        console.log("planet model save" + data.size);
        return false;
    }

    //verify that the atmosphere is not empty
    if (data.atmosphere === "") {
        console.log("planet model save" + data.atmosphere);
        return false;
    }

    //verify that the type is not empty
    if (data.type === "") {
        console.log("planet model save" + data.type);
        return false;
    }

    //verify that the size is not empty
    if (data.size === "") {
        console.log("planet model save" + data.size);
        return false;
    }


    //else insert the new planet
    const stmt = db.prepare('INSERT INTO PLANETS(name, size, atmosphere, type) VALUES (?, ?, ?, ?)');
    const info = stmt.run(data.name, data.size, data.atmosphere, data.type);
    console.log("planet model save" + info.changes);
    return true;


};

module.exports.search = (name) => {
    return db.prepare('SELECT * FROM PLANETS WHERE name LIKE ?').all(name);
};

module.exports.delete = (name) => {
    db.prepare('DELETE FROM PLANETS WHERE name = ?').run(name);
};

