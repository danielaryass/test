package models

type Transaksi_keuanganAlissa struct {
	ID          uint   `json:"id" gorm:"primaryKey;autoIncrement"`
	Date        string `json:"date" gorm:"type:date" binding:"required"`
	Description string `json:"description" gorm:"type:text" binding:"required"`
	Amount      int64  `json:"amount" gorm:"type:bigint" binding:"required"`
	Status      string `json:"status" gorm:"type:enum('debit','kredit')" binding:"required"`
	Receiver    string `json:"receiver" gorm:"type:varchar(50)" binding:"required"`
	JK          string `json:"jk" gorm:"type:enum('L','P')" binding:"required"`
	NoTelp      string `json:"no_telp" gorm:"type:varchar(13)" binding:"required"`
	Address     string `json:"address" gorm:"type:text" binding:"required"`
}
