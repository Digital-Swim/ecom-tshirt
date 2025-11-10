package main

import (
	"fmt"
	"os"

	"github.com/gocolly/colly"
)

func StartCrawl() {
	worklist := make(chan []string)

	go func() {
		worklist <- os.Args[1:]
	}()

	seen := make(map[string]bool)

	for list := range worklist {
		for _, link := range list {
			if !seen[link] {
				go func(l string) {
					worklist <- crawl(link)
				}(link)
			}
		}
	}

	fmt.Println(<-worklist)
}

func crawl(l string) []string {

	fmt.Println(`Crawling `, l)
	c := colly.NewCollector()
	links := make([]string, 0)

	c.OnHTML("a[href]", func(e *colly.HTMLElement) {
		link := e.Attr("href")
		links = append(links, link)
	})

	c.Visit(l)
	c.Wait()

	return links

}
