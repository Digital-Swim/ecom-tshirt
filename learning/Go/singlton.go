package main

import "sync"

var once sync.Once

type Config struct {
	AppName    string
	AppVersion int
}

var instance *Config

func GetInstance() *Config {
	once.Do(func() {
		instance = &Config{AppName: "", AppVersion: 1}
	})
	return instance
}
