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

type Blog struct {
	UID         string    `json:"_id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Image       string    `json:"image"`
	Category    string    `json:"category"`
	Slug	    string    `json:"slug"`
	UserRefer   string    `json:"user_id"`
	CreatedAt   time.Time `json:"created_at"`
}

func createResponseBlog(blogData models.Blog) Blog {
    return Blog{UID: blogData.UID, Title: blogData.Title, Description: blogData.Description,
		        Image: blogData.Image, Category: blogData.Category,CreatedAt: blogData.CreatedAt,Slug: blogData.Slug, UserRefer: blogData.UserRefer, }
}

func CreateBlog(c *fiber.Ctx) error {
   token := c.Locals("user").(*jwt.Token)
   claims := token.Claims.(jwt.MapClaims)
   id := claims["sub"].(string)

   var data map[string]string
   
   if err := c.BodyParser(&data); err != nil {
	   return c.Status(500).JSON(fiber.Map{
		   "msg":err.Error(),
	   })
   }

   if data["title"] == "" {
		return c.Status(400).JSON(fiber.Map{
			"msg":"Title is required!",
		})
   }
   // check title
   var check models.Blog
   config.Database.Db.Where("title = ?", strings.ToLower(data["title"])).First(&check)

   if check.Id != 0 {
	   return c.Status(400).JSON(fiber.Map{
		   "msg":"The title is already in use!",
	   })
   }

   if data["description"] == "" {
		return c.Status(400).JSON(fiber.Map{
			"msg":"Description is required!",
		})
   }

   if data["category"] == "" {
		return c.Status(400).JSON(fiber.Map{
			"msg":"Category is required!",
		})
   }

   if data["image"] == "" {
		return c.Status(400).JSON(fiber.Map{
			"msg":"upload an image!",
		})
   }

   blog := models.Blog{
	   Title: strings.ToLower(data["title"]),
	   Description: data["description"],
	   Category: data["category"],
	   Image: data["image"],
	   Slug: strings.ReplaceAll(strings.ToLower(data["title"])," ",""),
	   UserRefer: id,
	   UID: uuid.New().String(),
   }
   
   config.Database.Db.Create(&blog)
   responseBlog := createResponseBlog(blog)
   
   return c.Status(200).JSON(fiber.Map{
	   "msg":"Create Success..",
	   "blog": responseBlog,
   })
}

func GetBlogs(c *fiber.Ctx) error {
	blogs := []models.Blog{}
     // find blogs
	config.Database.Db.Find(&blogs)

	responseBlogs := []Blog{}

	for _, blog := range blogs {
		responseBlog := createResponseBlog(blog)
		responseBlogs = append(responseBlogs, responseBlog)
	}

	return c.Status(200).JSON(fiber.Map{
		"blogs": responseBlogs,
		"total": len(responseBlogs),
	})
}

func UpdateBlog(c *fiber.Ctx) error{
	token := c.Locals("user").(*jwt.Token)
	claims := token.Claims.(jwt.MapClaims)
	user_id := claims["sub"].(string)
	// param
	id := c.Params("id")

	if id == "" {
		return c.Status(400).JSON(fiber.Map{
			"msg": "blog id is required",
		})
	}

	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"msg": err.Error(),
		})
	}

	// find blog
	var blog models.Blog
	config.Database.Db.Where("uid = ?", id).First(&blog)

	if blog.Id == 0 {
		return c.Status(400).JSON(fiber.Map{
			"msg": "No blog was found!",
		})
	}

	if blog.UserRefer != user_id {
		return c.Status(200).JSON(fiber.Map{
			"msg":"Invalid auth cannot update blog",
		})
	}

	// update blog
	blog.Title = strings.ToLower(data["title"])
	blog.Description = data["description"]
	blog.Image = data["image"]
	blog.Category = data["category"]
	blog.Slug = strings.ReplaceAll(strings.ToLower(data["title"])," ","")

	config.Database.Db.Save(&blog)

	return c.Status(200).JSON(fiber.Map{
		"msg":"Update success..",
	})
}

func DeleteBlog(c *fiber.Ctx) error{
	token := c.Locals("user").(*jwt.Token)
	claims := token.Claims.(jwt.MapClaims)
	user_id := claims["sub"].(string)
	// param
	id := c.Params("id")

	if id == "" {
		return c.Status(400).JSON(fiber.Map{
			"msg": "blog id is required",
		})
	}

	// find blog
	var blog models.Blog
	config.Database.Db.Where("uid = ?", id).First(&blog)

	if blog.Id == 0 {
		return c.Status(400).JSON(fiber.Map{
			"msg": "No blog was found!",
		})
	}

	if blog.UserRefer != user_id {
		return c.Status(200).JSON(fiber.Map{
			"msg":"Invalid auth cannot delte blog",
		})
	}

	// delete blog
	config.Database.Db.Delete(&blog)

	return c.Status(200).JSON(fiber.Map{
		"msg":"Delete success..",
	})
}