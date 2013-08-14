NODEBINDIR ?= ./node_modules/.bin

node_modules:
	@npm install

test: node_modules
	@$(NODEBINDIR)/testem ci --launch PhantomJS --test_page test/index.html

.PHONY: clean test
