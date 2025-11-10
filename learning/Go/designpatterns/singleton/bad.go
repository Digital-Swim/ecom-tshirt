package singleton

import (
	"database/sql"

	_ "github.com/lib/pq"
)

func ConnectDB() *sql.DB {
	// ❌ Every call creates a NEW DB connection
	db, err := sql.Open("postgres", "user=admin dbname=app sslmode=disable")
	if err != nil {
		panic(err)
	}
	return db
}
