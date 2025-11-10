package main

import "fmt"

type Person interface {
	GetName() string
}

type Account interface {
	GetBalance() int
}

type Holder struct {
	Name string
}

func (p *Holder) GetName() string {
	return p.Name
}

type SavingAccount struct {
	holder Person
	amount int
}

type CurrentAccount struct {
	amount int
	holder Person
}

func (a *SavingAccount) GetBalance() int {
	return a.amount
}

func (a *CurrentAccount) GetBalance() int {
	return a.amount
}

func AddInterest(account Account) float32 {
	return (float32(account.GetBalance()) * 2) / 100
}

func TestAcconts() {

	p := Holder{Name: "Ranjit"}
	a := &SavingAccount{holder: &p, amount: 100}

	fmt.Println(a.GetBalance())

	fmt.Println(AddInterest(a))

}
