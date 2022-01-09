package controllers

import (
	"strings"
	"time"
	"github.com/Fu-ry17/blog/config"
	"github.com/Fu-ry17/blog/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
)

type Category struct {
	UID       string    `json:"_id"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
}

func responseCategory(categ models.Category) Category {
	return Category{UID: categ.UID, Name: categ.Name, CreatedAt: categ.CreatedAt}
}

func CreateCategory(c *fiber.Ctx) error {
	token := c.Locals("user").(*jwt.Token)
	claims := token.Claims.(jwt.MapClaims)
	user_id := claims["sub"].(string)

	// check admin
	var user models.User
	config.Database.Db.Where("uid = ?", user_id).First(&user)
    
	if user.Id == 0 {
		return c.Status(400).JSON(fiber.Map{
			"msg":"No user was found",
		})
	}

	if user.Role != "admin" {
		return c.Status(400).JSON(fiber.Map{
			"msg":"Invalid authorization admin resources only",
		})
	}

	var data map[string]string

	if err := c.BodyParser(&data); err != nil{
		return c.Status(500).JSON(fiber.Map{
			"msg":err.Error(),
		})
	}

	// check
	var check models.Category
	config.Database.Db.Where("name = ?", strings.ToLower(data["name"])).First(&check)

	if check.Id != 0 {
        return c.Status(400).JSON(fiber.Map{
			"msg":"The Category already exists..",
		})
	}  

	category := models.Category{
		UID: uuid.New().String(),
		Name: strings.ToLower(data["name"]),
	}

	// create
	config.Database.Db.Create(&category)
	response := responseCategory(category)

	return c.Status(200).JSON(fiber.Map{
		"msg":"Create success..",
		"category":response,
	})
}

func GetCategories(c *fiber.Ctx) error {
	categories := []models.Category{}
     // find categories
	config.Database.Db.Find(&categories)

	responseCategories := []Category{}

	for _, category := range categories {
		response := responseCategory(category)
		responseCategories = append(responseCategories, response)
	}

	return c.Status(200).JSON(fiber.Map{
		"categories": responseCategories,
		"total": len(responseCategories),
	})
}

func UpdateCategory(c *fiber.Ctx) error {
	token := c.Locals("user").(*jwt.Token)
	claims := token.Claims.(jwt.MapClaims)
	user_id := claims["sub"].(string)

	// check admin
	var user models.User
	config.Database.Db.Where("uid = ?", user_id).First(&user)
    
	if user.Id == 0 {
		return c.Status(400).JSON(fiber.Map{
			"msg":"No user was found",
		})
	}

	if user.Role != "admin" {
		return c.Status(400).JSON(fiber.Map{
			"msg":"Invalid authorization admin resources only",
		})
	}
	// parms id
	id := c.Params("id")

	if id == "" {
		return c.Status(400).JSON(fiber.Map{
			"msg": "category id is required",
		})
	}

	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"msg": err.Error(),
		})
	}

	// find category
	var category models.Category
	config.Database.Db.Where("uid = ?", id).First(&category)

	if category.Id == 0 {
		return c.Status(400).JSON(fiber.Map{
			"msg": "No blog was found!",
		})
	}

	// update category
	category.Name = data["name"]
	config.Database.Db.Save(&category)

	return c.Status(200).JSON(fiber.Map{
		"msg":"Update success..",
	})
}

func DeleteCategory(c *fiber.Ctx) error{
	token := c.Locals("user").(*jwt.Token)
	claims := token.Claims.(jwt.MapClaims)
	user_id := claims["sub"].(string)

	// check admin
	var user models.User
	config.Database.Db.Where("uid = ?", user_id).First(&user)
    
	if user.Id == 0 {
		return c.Status(400).JSON(fiber.Map{
			"msg":"No user was found",
		})
	}

	if user.Role != "admin" {
		return c.Status(400).JSON(fiber.Map{
			"msg":"Invalid authorization admin resources only",
		})
	}
	// param
	id := c.Params("id")

	if id == "" {
		return c.Status(400).JSON(fiber.Map{
			"msg": "category id is required",
		})
	}

	// find category
	var category models.Category
	config.Database.Db.Where("uid = ?", id).First(&category)

	if category.Id == 0 {
		return c.Status(400).JSON(fiber.Map{
			"msg": "No category was found!",
		})
	}

	// delete category
	config.Database.Db.Delete(&category)

	return c.Status(200).JSON(fiber.Map{
		"msg":"Delete success..",
	})
}

