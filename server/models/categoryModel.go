package models

import (
	"time"
	"gorm.io/gorm"
)

type Category struct {
	gorm.Model
	Id uint `json:"id" gorm:"primaryKey"`
	Name string `json:"name" gorm:"unique"`
	UID string `json:"_id" gorm:"unique"`
    CreatedAt time.Time `json:"created_at"`
}