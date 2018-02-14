package main

import (
	"fmt"
	"net/http"
  "log"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("./public/client")))

  fmt.Println("listening on port 8080")
  if err := http.ListenAndServe(":8080", nil); err != nil {
      log.Fatal(err)
  }
}
