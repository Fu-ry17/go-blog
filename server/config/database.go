package config

import (
	"log"
	"os"

	"github.com/Fu-ry17/blog/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type DBInstance struct {
	Db *gorm.DB
}

var Database DBInstance

func ConnectDB() {
	db, err := gorm.Open(sqlite.Open("blog.db"))

	if err != nil {
		log.Fatal("Failed to connect to database..")
		os.Exit(2)
	}

	log.Println("DB connection success...")
	db.Logger = logger.Default.LogMode(logger.Info)
    
	log.Println("Running migrations...")
	// migrations
    db.AutoMigrate(&models.Blog{}, &models.User{}, &models.Category{})	

	Database = DBInstance{Db: db}
}