package main

import (
	"fmt"

	"learning.com/go/designpatterns/singleton"
)

func main() {
	// DB usage
	db1 := singleton.GetDB()
	db2 := singleton.GetDB()
	fmt.Println("DB instances same?", db1 == db2)

}
