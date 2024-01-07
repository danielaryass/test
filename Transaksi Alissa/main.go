package main

import (
	"github.com/Alissaisni/golang/controllers/transactioncontroller"
	"github.com/Alissaisni/golang/models"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	models.ConnectDatabase()

	r.GET("/api/reports", transactioncontroller.Index)
	r.GET("/api/reports/:id", transactioncontroller.Show)
	r.POST("/api/reports", transactioncontroller.Create)
	r.PUT("/api/reports/:id", transactioncontroller.Update)
	r.DELETE("/api/reports/:id", transactioncontroller.Delete)
	r.GET("/api/reports/search", transactioncontroller.Search)

	r.Run()

}
