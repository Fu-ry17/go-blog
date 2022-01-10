package routes

import (
	"github.com/Fu-ry17/blog/controllers"
	"github.com/Fu-ry17/blog/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetUpRoutes(app *fiber.App ) error {
    
	app.Get("/", middleware.Auth(), func(c *fiber.Ctx) error {
		return c.Status(200).JSON(fiber.Map{
			"msg":"Hello world",
		})
	})

	// auth routes
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)
	app.Get("/api/refreshToken", controllers.RefreshToken)
	app.Post("/api/logout", controllers.Logout)

	// user routes
	app.Patch("/api/user", middleware.Auth(), controllers.UpdateUser)
	app.Patch("/api/reset", middleware.Auth(), controllers.ResetPassword)

	// category routes
	app.Get("/api/category", controllers.GetCategories)
	app.Post("/api/category", middleware.Auth(), controllers.CreateCategory)
	app.Patch("/api/category/:id",middleware.Auth(), controllers.UpdateCategory)
	app.Delete("/api/category/:id",middleware.Auth(), controllers.DeleteCategory)

	// blog routes
	app.Get("/api/blogs", controllers.GetBlogs)
	app.Get("/api/blogs/:category", controllers.GetCategBlogs)
	app.Post("/api/blogs", middleware.Auth(), controllers.CreateBlog)
	app.Patch("/api/blogs/:id", middleware.Auth(), controllers.UpdateBlog)
	app.Delete("/api/blogs/:id",middleware.Auth(), controllers.DeleteBlog)

	return nil
}