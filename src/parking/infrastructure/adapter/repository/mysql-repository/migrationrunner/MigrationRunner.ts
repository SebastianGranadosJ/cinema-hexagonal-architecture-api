import MysqlDBC from "../../../../../../shared/repository/infrastructure/dbc/local/mysql/LocalMySQLDBC";

export default class MigrationRunner {
  private readonly db: MysqlDBC;

  constructor() {
    this.db = MysqlDBC.getInstance();
  }

  readonly migrateCustomerVehicle = async (): Promise<void> => {
    const sql = `
      CREATE TABLE IF NOT EXISTS CustomerVehicle (
        numberPlate VARCHAR(20)  PRIMARY KEY NOT NULL,
        vehicleType VARCHAR(20) NOT NULL
      )
    `;
    await this.db.execute(sql);
  }

  readonly migrateParkingSession = async (): Promise<void> => {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS ParkingSession (
        id INT AUTO_INCREMENT PRIMARY KEY,
        recordId VARCHAR(50) UNIQUE,
        vehiclePlate VARCHAR(20) NOT NULL,
        vehicleType VARCHAR(30) NOT NULL,
        entryDateTime DATETIME NOT NULL,
        exitDateTime DATETIME NULL,
        isFinished BOOLEAN NOT NULL,
        parkedMinutes INT NULL,
        isClient BOOLEAN NOT NULL,
        amountPaid DECIMAL(10,2) NOT NULL
      )
    `;


    // Crear tabla
    await this.db.execute(createTableSQL);


  }

  readonly migrateAll = async (): Promise<void> => {
    await this.migrateCustomerVehicle();
    await this.migrateParkingSession();
  }
}
