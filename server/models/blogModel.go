package models

import (
	"time"

	"gorm.io/gorm"
)

type Blog struct {
	gorm.Model
	Id uint `json:"id" gorm:"primaryKey"`
	Title string `json:"title"`
	Description string `json:"description"`
	Image string `json:"image"`
	Category string `json:"category"`
	UID string `json:"_id" gorm:"unique"`
	UserRefer string `json:"user_id"`
	Slug string `json:"slug"`
	User User `gorm:"foreignKey:UserRefer"`
	CreatedAt time.Time `json:"created_at"`
}
