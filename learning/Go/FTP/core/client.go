package core

import (
	"io"
	"log"
	"net"
	"os"
)

func StartClient() {

	conn, err := net.Dial("tcp", "localhost:2121")
	if err != nil {
		panic(err)
	}
	defer conn.Close()

	go MustCopy(os.Stdout, conn)

	MustCopy(conn, os.Stdin)
}

func MustCopy(dst io.Writer, src io.Reader) {
	if _, err := io.Copy(dst, src); err != nil {
		log.Fatal(err.Error())
	}
}
