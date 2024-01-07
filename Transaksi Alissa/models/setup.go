package models

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	database, err := gorm.Open(mysql.Open("root:@tcp(localhost:3306)/db_2202638_alissa_isni_silviani_sutadi_uas_pilkomb"))
	if err != nil {
		panic(err)
	}

	database.AutoMigrate(&Transaksi_keuanganAlissa{})
	DB = database
}
