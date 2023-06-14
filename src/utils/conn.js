const util = require( 'util' );
const mysql = require( 'mysql' );
module.exports.conn = function conn(  ) {
   const config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
      };
  const connection = mysql.createPool( config );
  return {
    query( sql, args ) {
      return util.promisify( connection.query )
        .call( connection, sql, args );
    },
    close() {
      return util.promisify( connection.end ).call( connection );
    }
  };
}

/**
 * 
 * 
 *  sheet.getRange(i+1,1).setValue(stats[i]["date_year"]);
    sheet.getRange(i+1,2).setValue(stats[i]["date_monthnumber"]);
    sheet.getRange(i+1,3).setValue(stats[i]["dealer_slug"]);
    sheet.getRange(i+1,4).setValue(stats[i]["m_page_loads"]);
    sheet.getRange(i+1,5).setValue(stats[i]["m_email"]);
    sheet.getRange(i+1,6).setValue(stats[i]["m_phone"]);
    sheet.getRange(i+1,7).setValue(stats[i]["m_add_to_favourites"]);
    sheet.getRange(i+1,8).setValue(stats[i]["m_click_dealer_website"]);
    sheet.getRange(i+1,9).setValue(stats[i]["m_show_dealer_on_map"]);
    sheet.getRange(i+1,10).setValue(stats[i]["m_share_social"]);
 */