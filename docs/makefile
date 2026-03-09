FILE       ?= main
SRC_DIR     = src
DOC_DIR	   ?= .
BUILD_DIR  ?= .
ASSETS_DIR	= assets

TYP_BASE_NAME = $(basename $(notdir $(FILE)))

all: compile

compile:
	@mkdir -p $(BUILD_DIR)
	typst compile $(DOC_DIR)/$(FILE).typ $(BUILD_DIR)/$(TYP_BASE_NAME).pdf --root ..

watch: 
	@mkdir -p $(BUILD_DIR)
	typst watch $(DOC_DIR)/$(FILE).typ $(BUILD_DIR)/$(TYP_BASE_NAME).pdf --root ..

clean:
	rm -rf $(BUILD_DIR)/*.pdf

.PHONY: all compile watch clean
