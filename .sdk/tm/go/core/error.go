package core

type KekkaiCurrencyError struct {
	IsKekkaiCurrencyError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewKekkaiCurrencyError(code string, msg string, ctx *Context) *KekkaiCurrencyError {
	return &KekkaiCurrencyError{
		IsKekkaiCurrencyError: true,
		Sdk:              "KekkaiCurrency",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *KekkaiCurrencyError) Error() string {
	return e.Msg
}
