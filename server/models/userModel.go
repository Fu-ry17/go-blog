package models

import (
	"time"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Id uint `json:"id" gorm:"primaryKey"`
	Name string `json:"name"`
	Email string `json:"email" gorm:"unique"`
	Password []byte `json:"password"`
	Avatar string `json:"avatar" gorm:"default:https://res.cloudinary.com/duzm9in6w/image/upload/v1636649949/blog/avatar_jwffwk.jpg"`
	Role string `json:"role" gorm:"default:user"`
	UID string `json:"_id" gorm:"unique"`
	CreatedAt time.Time `json:"created_at"`
}