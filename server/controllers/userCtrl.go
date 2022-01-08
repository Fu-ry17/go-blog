package controllers

import (
	"github.com/Fu-ry17/blog/config"
	"github.com/Fu-ry17/blog/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

func UpdateUser(c *fiber.Ctx) error {
	token := c.Locals("user").(*jwt.Token)
	claims := token.Claims.(jwt.MapClaims)
	id := claims["sub"].(string)
    
	// requsets body
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"msg": err.Error(),
		})
	}
	// find user
	var user models.User
	config.Database.Db.Where("uid = ?", id).First(&user)

	if user.Id == 0 {
		return c.Status(400).JSON(fiber.Map{
			"msg": "No user was found!",
		})
	}

	if user.UID != id{
		return c.Status(400).JSON(fiber.Map{
			"msg": "Invalid auth cannot update user details!",
		})
	} 

	user.Avatar = data["avatar"]
	user.Name = data["name"]

	// save user
	config.Database.Db.Save(&user)

	return c.Status(200).JSON(fiber.Map{
		"msg": "update success..",
	})
}

func ResetPassword(c *fiber.Ctx) error {
	token := c.Locals("user").(*jwt.Token)
	claims := token.Claims.(jwt.MapClaims)
	id := claims["sub"].(string)
    
	// requsets body
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"msg": err.Error(),
		})
	}
	// find user
	var user models.User
	config.Database.Db.Where("uid = ?", id).First(&user)

	if user.Id == 0 {
		return c.Status(400).JSON(fiber.Map{
			"msg": "No user was found!",
		})
	}

	if user.UID != id{
		return c.Status(400).JSON(fiber.Map{
			"msg": "Invalid auth cannot update user details!",
		})
	}

	if len(data["passsword"]) < 6 {
		return c.Status(400).JSON(fiber.Map{
			"msg": "The password should be atleast 6 characters",
		})
	}
	// hash password
    password, err := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"msg": err.Error(),
		})
	}
	// save
	user.Password = password
	config.Database.Db.Save(&user)

	return c.Status(200).JSON(fiber.Map{
		"msg": "Password has been reset",
	})
}