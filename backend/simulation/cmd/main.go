package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"../household"
	"github.com/gorilla/websocket"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Home Page")
}

func simEndpoint(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}

	log.Println("Simulation in progress...")

	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(
		"mongodb+srv://ratankaliani:bL0cK%3Fp4rT%2A@cluster0-iasb3.mongodb.net/Microgrid?retryWrites=true&w=majority?authSource=admin",
	))
	if err != nil {
		log.Fatal(err)
	}

	ticker := time.NewTicker(3000 * time.Millisecond)
	for {
		select {
		case t := <-ticker.C:
			fmt.Println("Tick at", t)
			updates := household.Update(ctx, client)
			if err = conn.WriteJSON(updates); err != nil {
				fmt.Println(err)
			}
		}
	}
}

func setupRoutes() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/ws", simEndpoint)
}

func main() {
	setupRoutes()
	fmt.Println("We are living in a simuation...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
