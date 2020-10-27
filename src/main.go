package main

import (
	"io"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

var stream chan Event

func init() {
	stream = make(chan Event, 10)
}

type Event struct {
	Type string
	Data string
}

func testStream() {
	for i := 0; i < 10; i++ {
		stream <- Event{
			Type: "test",
			Data: strconv.Itoa(i),
		}

		time.Sleep(1 * time.Second)
	}
}

func main() {
	router := gin.Default()

	// TODO dynamically find path to views folder
	router.Use(static.Serve("/", static.LocalFile("./views", true)))

	api := router.Group("/api")

	api.POST("/code", RunCode)
	api.GET("/events", Events)

	api.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{})
	})

	gin.SetMode(gin.DebugMode)
	router.Run("localhost:8080")
}

// RunCode runs code and streams a list of events to the UI
func RunCode(c *gin.Context) {
	testStream()
	c.JSON(http.StatusOK, gin.H{
		"message": "Yo",
	})
}

func Events(c *gin.Context) {
	c.Stream(func(w io.Writer) bool {
		if event, ok := <-stream; ok {
			c.SSEvent(event.Type, event.Data)
			return true
		}
		return false
	})
}
