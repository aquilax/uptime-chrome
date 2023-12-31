SHELL := /bin/bash
SRC = ./src
ASSETS = ./assets
EXT_DIR = uptime
BUILD = ./build
BUILD_ICONS = $(BUILD)/icons
BUILD_RAW = $(BUILD)/$(EXT_DIR)
VERSION := $(shell jq -r .version $(SRC)/manifest.json)

ICON_SIZES = 16 19 48 128

all: clean dirs icons raw pack

clean:
	rm -rf $(BUILD)

dirs:
	mkdir -p $(BUILD_RAW)
	mkdir -p $(BUILD_ICONS)

icons:
	$(foreach size, $(ICON_SIZES), \
		inkscape $(ASSETS)/icon.svg -w $(size) -h $(size) --export-filename=$(BUILD_ICONS)/icon_$(size).png ; \
	)

raw:
	cp $(SRC)/manifest.json $(BUILD_RAW)
	cp $(SRC)/uptime.js $(BUILD_RAW)
	cp $(BUILD_ICONS)/icon_16.png $(BUILD_RAW)
	cp $(BUILD_ICONS)/icon_19.png $(BUILD_RAW)
	cp $(BUILD_ICONS)/icon_48.png $(BUILD_RAW)
	cp $(BUILD_ICONS)/icon_128.png $(BUILD_RAW)

pack:
	cd $(BUILD_RAW); zip -r ../uptime-$(VERSION).zip *; cd ..