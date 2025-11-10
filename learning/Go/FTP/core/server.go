package core

import (
	"bufio"
	"fmt"
	"net"
	"os"
	"strings"
)

func StartServer() {
	listener, err := net.Listen("tcp", "127.0.0.1:2121")
	if err != nil {
		panic(err)
	}

	fmt.Println("FTP-like server started on port 2121")

	for {
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("Connection error:", err)
			continue
		}
		go handleConn(conn)
	}

}

func handleConn(conn net.Conn) {
	defer conn.Close()
	scanner := bufio.NewScanner(conn)
	isEcho := false
	for {

		if !scanner.Scan() {
			break
		}

		cmd := scanner.Text()

		if isEcho {
			isEcho = false
			fmt.Fprintln(conn, cmd)
			fmt.Fprintln(conn, strings.ToLower(cmd))
			continue
		}

		switch cmd {
		case "ls":
			listFiles(conn)
		case "echo":
			fmt.Fprintln(conn, "Say something ->")
			isEcho = true
		default:
			fmt.Fprintln(conn, "Unknown Command")
		}

	}

}

func listFiles(conn net.Conn) {
	entries, err := os.ReadDir(".")
	if err != nil {
		fmt.Fprintln(conn, "Error reading directory:", err)
		return
	}
	for _, e := range entries {
		info, _ := e.Info()
		fmt.Fprintf(conn, "%-20s %10d bytes\n", e.Name(), info.Size())
	}
}
