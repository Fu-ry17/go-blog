package middleware

import (
	"github.com/Fu-ry17/blog/utils"
	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v3"
)

func Auth() func (c *fiber.Ctx) error {
	return jwtware.New(jwtware.Config{
		SigningKey: []byte(utils.ACCESS_TOKEN_SECRET),
		TokenLookup: "header:Authorization",
		ErrorHandler: func(c *fiber.Ctx, e error) error {
			return c.Status(400).JSON(fiber.Map{
				"msg":"Invalid authorization",
			})
		},
	})
}