package main

import (
  "fmt"
  "net/http"
  "html/template"
  "math"

)



func main() {
  templates := template.Must(template.ParseFiles("templates/index.html"))

http.HandleFunc("/", func( w http.ResponseWriter, r *http.Request) {
  if err := templates.ExecuteTemplate(w, "index.html", nil); err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
  }
  fmt.Fprintf(w, "Hello Go web Developer!")
  })
fmt.Println(http.ListenAndServe(":8080", nil))
fmt.Println("The square root of 4 is", math.Sqrt(4))
}
