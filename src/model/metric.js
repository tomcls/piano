const conn = require("../utils/conn");
const db = conn.conn();
module.exports = class Metric {
    constructor() { }
    async findAll(filters) {
        let sql = "SELECT *"+
            "FROM metric "+
            "WHERE 1 = 1 ";
        let params = [];
        let filterClause = '';
        if (filters.id) {
            sql += " and metric.id = ?"
            params.push(filters.id);
        }
        if (filters.date_year) {
            sql += " and metric.date_year = ?"
            params.push(filters.date_year);
        }
        if (filters.date_monthnumber) {
            sql += " and metric.date_monthnumber = ?"
            params.push(filters.date_monthnumber);
        }
        if(filters.limit) {
            filterClause = " limit "+((filters.page)*filters.limit)+', '+(filters.limit*(filters.page+1));
        }
        sql += " order by metric.m_page_loads desc "+filterClause;
        try {
            const combined = [...params]; //const combined = [...params, ...paramsSearch];
            let rows = await db.query(sql, combined);
            if (rows && rows.length > 0) {
                return rows;
            }
            return null;
        } catch (error) {
            return error
        }
    }

    async add(o) {
        let sql = "INSERT INTO metric SET ? ";
        try {
            const add = await db.query(sql, o);
            return {
                saved: add.affectedRows,
                inserted_id: add.insertId
            };
        }
        catch (err) {
            return err;
        }
    }
}