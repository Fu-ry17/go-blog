package main

import (
	"log"

	"github.com/Fu-ry17/blog/config"
	"github.com/Fu-ry17/blog/routes"
	"github.com/gofiber/fiber/v2"
)

func main() {
	config.ConnectDB()
	
	app := fiber.New()
    
	// routes
	routes.SetUpRoutes(app)

	log.Fatal(app.Listen(":3001"))
}