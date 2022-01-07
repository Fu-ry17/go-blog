package utils

import (
	"time"
	"github.com/dgrijalva/jwt-go/v4"
)

const ACCESS_TOKEN_SECRET = "myAccessTokenSecret"

const REFRESH_TOKEN_SECRET = "myRefreshTokenSecret"

func CreateAccessToken(id string) string {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["sub"] = id
	claims["exp"] = time.Now().Add(time.Hour * 24 * 7 ).Unix()

	s, err := token.SignedString([]byte(ACCESS_TOKEN_SECRET))

	if err != nil {
		return err.Error()
	}

	return "Bearer " + s
}

func CreateRefreshToken(id string) string {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["sub"] = id
	claims["exp"] = time.Now().Add(time.Hour * 24 * 7 ).Unix()

	s, err := token.SignedString([]byte(REFRESH_TOKEN_SECRET))

	if err != nil {
		return err.Error()
	}

	return s
}