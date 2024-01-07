package transactioncontroller

import (
	"net/http"
	"strconv"

	"github.com/Alissaisni/golang/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Index(c *gin.Context) {
	var transactions []models.Transaksi_keuanganAlissa

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	offset := (page - 1) * limit

	// Find total number of transactions
	var total int64
	models.DB.Model(&models.Transaksi_keuanganAlissa{}).Count(&total)

	// Calculate total pages
	totalPages := int((total + int64(limit) - 1) / int64(limit))

	models.DB.Order("date desc").Limit(limit).Offset(offset).Find(&transactions)

	c.JSON(http.StatusOK, gin.H{
		"Transactions": transactions,
		"Pagination": gin.H{
			"CurrentPage": page,
			"Limit":       limit,
			"TotalPages":  totalPages,
		},
	})
}
func Show(c *gin.Context) {
	var transaction models.Transaksi_keuanganAlissa
	id := c.Param("id")
	if err := models.DB.First(&transaction, id).Error; err != nil {
		switch err {
		case gorm.ErrRecordNotFound:
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": "Data tidak ditemukan"})
			return
		default:
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
	}
	c.JSON(http.StatusOK, gin.H{"Transaction": transaction})
}
func Create(c *gin.Context) {
	var transaction models.Transaksi_keuanganAlissa
	if err := c.ShouldBindJSON(&transaction); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	models.DB.Create(&transaction)
	c.JSON(http.StatusOK, gin.H{"Transaction": transaction})
}

func Update(c *gin.Context) {
	var transaction models.Transaksi_keuanganAlissa
	id := c.Param("id")
	if err := models.DB.First(&transaction, id).Error; err != nil {
		switch err {
		case gorm.ErrRecordNotFound:
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": "Data tidak ditemukan"})
			return
		default:
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
	}
	if err := c.ShouldBindJSON(&transaction); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	models.DB.Save(&transaction)
	c.JSON(http.StatusOK, gin.H{"Transaction": transaction})
}
func Delete(c *gin.Context) {
	var transaction models.Transaksi_keuanganAlissa
	id := c.Param("id")
	if err := models.DB.Delete(&transaction, id).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Data berhasil dihapus"})

}

func Search(c *gin.Context) {
	var transactions []models.Transaksi_keuanganAlissa

	search := c.Query("search")

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	offset := (page - 1) * limit

	// Find total number of transactions
	var total int64
	models.DB.Model(&models.Transaksi_keuanganAlissa{}).Where("description LIKE ?", "%"+search+"%").Count(&total)

	// Calculate total pages
	totalPages := int((total + int64(limit) - 1) / int64(limit))

	models.DB.Order("date desc").Where("description LIKE ?", "%"+search+"%").Limit(limit).Offset(offset).Find(&transactions)

	c.JSON(http.StatusOK, gin.H{
		"Transactions": transactions,
		"Pagination": gin.H{
			"CurrentPage": page,
			"Limit":       limit,
			"TotalPages":  totalPages,
		},
	})
}
