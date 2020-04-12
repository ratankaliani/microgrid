package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"../household"
	"github.com/gorilla/websocket"
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

	ticker := time.NewTicker(5000 * time.Millisecond)
	for {
		select {
		case t := <-ticker.C:
			fmt.Println("Tick at", t)
			updates := household.Update()
			fmt.Println(updates)
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
