export default class ParkingSessionSQLQueries {
  static readonly INSERT = `
    INSERT INTO ParkingSession 
    (vehiclePlate, vehicleType, entryDateTime, isFinished, isClient, amountPaid) 
    VALUES (?, ?, ?, ?, ?, ?)
  `

  static readonly UPDATE_CLOSE = `
    UPDATE ParkingSession
    SET exitDateTime = ?, isFinished = ?, parkedMinutes = ?, amountPaid = ?
    WHERE vehiclePlate = ? AND isFinished = false
    ORDER BY entryDateTime ASC
    LIMIT 1
  `

  static readonly COUNT_ACTIVE_BY_TYPE = `
    SELECT COUNT(*) as total 
    FROM ParkingSession 
    WHERE vehicleType = ? AND isFinished = false
  `

  static readonly SELECT_REPORT = `
    SELECT * FROM ParkingSession 
    WHERE DATE(exitDateTime) = DATE(?) AND isFinished = TRUE
  `


  static readonly SELECT_RECORD_ID = `
    SELECT recordId 
    FROM ParkingSession 
    WHERE id = ?
  `

  static readonly SELECT_ACTIVE_BY_PLATE = `
    SELECT * 
    FROM ParkingSession
    WHERE vehiclePlate = ? AND isFinished = false
    ORDER BY entryDateTime ASC
    LIMIT 1
  `

  static readonly UPDATE_RECORD_ID = `
    UPDATE ParkingSession 
    SET recordId = ? 
    WHERE id = ?
    `
}
