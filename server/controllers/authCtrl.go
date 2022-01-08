package controllers

import (
	"time"
	"github.com/Fu-ry17/blog/config"
	"github.com/Fu-ry17/blog/models"
	"github.com/Fu-ry17/blog/utils"
	"github.com/dgrijalva/jwt-go/v4"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	UID       string    `json:"_id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Avatar    string    `json:"avatar"`
	Role      string    `json:"role"`
	CreatedAt time.Time `json:"created_at"`
}

func CreateResponseUser(userData models.User) User {
	return User{ UID: userData.UID, Name: userData.Name, Email: userData.Email, Avatar: userData.Avatar,
	             Role: userData.Role, CreatedAt: userData.CreatedAt }
}

func Register(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data);err != nil {
		return c.Status(500).JSON(fiber.Map{
			"msg":err.Error(),
		})
	}
    
	// check user
    var check models.User
	config.Database.Db.Where("email = ?", data["email"]).First(&check)

	if check.Id != 0 {
		return c.Status(400).JSON(fiber.Map{
			"msg":"The account is already in use",
		})
	}
    
	if len(data["password"]) < 6 {
		return c.Status(400).JSON(fiber.Map{
			"msg":"Password should be atleast 6 characters",
		})
	}

	// passhash
	password, err := bcrypt.GenerateFromPassword([]byte(data["password"]), 15)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"msg":err.Error(),
		})
	}

    // create user
	user := models.User{
		Name: data["name"],
		Email: data["email"],
		Password: password,
		UID: uuid.New().String(),
	}
    
	// save
	config.Database.Db.Create(&user)

	return c.Status(200).JSON(fiber.Map{
		"msg":"Register success..",
	})
}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"msg":err.Error(),
		})
	}
    
	// check user
	var user models.User
	config.Database.Db.Where("email = ?", data["email"]).First(&user)

	if user.Id == 0 {
		return c.Status(400).JSON(fiber.Map{
			"msg": "No account was found",
		})
	}

	// passcheck
	err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"]))

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"msg":"Wrong password",
		})
	}

	responseUser := CreateResponseUser(user)
     
	refreshToken := utils.CreateRefreshToken(user.UID)
	accessToken := utils.CreateAccessToken(user.UID)

	cookie := fiber.Cookie{
		Name: "refreshToken",
		Value: refreshToken,
		Path: "/api/refreshToken",
		Expires: time.Now().Add(time.Hour * 24 * 7),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.Status(200).JSON(fiber.Map{
		"msg": "Login success...",
		"accessToken": accessToken,
		"user": responseUser,
	})
}

func RefreshToken(c *fiber.Ctx) error {
	rf_token := c.Cookies("refreshToken")

	if rf_token == ""{
		return c.Status(500).JSON(fiber.Map{
			"msg": "Invalid authorization login..",
		})
	}

	token, err := jwt.Parse(rf_token, func(t *jwt.Token) (interface{}, error) {
		return []byte(utils.REFRESH_TOKEN_SECRET), nil
	})

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"msg": err.Error(),
		})
	}

	claims := token.Claims.(jwt.MapClaims)
	id := claims["sub"].(string)

	var user models.User
	// check user
	config.Database.Db.Where("uid = ?", id).First(&user)

	if user.Id == 0 {
		return c.Status(400).JSON(fiber.Map{
			"msg": "No user was found",
		})
	}
    
	accessToken := utils.CreateAccessToken(user.UID)
    responseUser := CreateResponseUser(user)

	return c.Status(200).JSON(fiber.Map{
		"accessToken": accessToken,
		"user": responseUser,
	})
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name: "refreshToken",
		Value: "",
		Path: "/api/refreshToken",
		Expires: time.Now().Add(-time.Hour),
		HTTPOnly: true,
		Secure: true,
	}

	c.Cookie(&cookie)

	return c.Status(200).JSON(fiber.Map{
		"msg": "Logout success...",
	})
}