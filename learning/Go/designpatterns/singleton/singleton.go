package singleton

import (
	"fmt"
	"sync"
)

var once sync.Once

func initialize() {
	fmt.Println("Initialization")
}

func GoRoutineCalls() {

	var wg sync.WaitGroup
	for range 5 {
		wg.Add(1)
		go func() {
			once.Do(initialize)
			wg.Done()
		}()
	}
	wg.Wait()
	fmt.Println("End function")
}

// ---------- DB Singleton ----------
type DB struct{}

var dbInstance *DB
var dbOnce sync.Once

func GetDB() *DB {
	dbOnce.Do(func() {
		dbInstance = &DB{}
		fmt.Println("DB connection created")
	})
	return dbInstance
}

// ---------- Logger Singleton ----------
type Logger struct{}

var loggerInstance *Logger
var loggerOnce sync.Once

func GetLogger() *Logger {
	loggerOnce.Do(func() {
		loggerInstance = &Logger{}
		fmt.Println("Logger created")
	})
	return loggerInstance
}

// ---------- Config Singleton ----------
type Config struct {
	Env string
}

var configInstance *Config
var configOnce sync.Once

func GetConfig() *Config {
	configOnce.Do(func() {
		configInstance = &Config{Env: "production"}
		fmt.Println("Config loaded")
	})
	return configInstance
}
