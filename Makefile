NODEBINDIR ?= ./node_modules/.bin
MOCHAFLAGS ?= --reporter dot --compilers coffee:coffee-script

node_modules:
	@npm install

test: node_modules
	@$(NODEBINDIR)/mocha $(MOCHAFLAGS)

.PHONY: clean test
