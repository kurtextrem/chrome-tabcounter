'use strict'

let counter = 0,
	resolved = false,
	promise = getCounter()

function getCounter() {
	return new Promise((resolve, reject) => {
		chrome.tabs.query({}, tabs => {
			setCounter(+tabs.length)
			resolved = true
			resolve()
		})
	})
}

function setCounter(count) {
	counter = count
	chrome.action.setBadgeText({ text: `${count}` })
}

chrome.tabs.onCreated.addListener(async () => {
	if (!resolved) await promise

	setCounter(counter + 1)
})
chrome.tabs.onRemoved.addListener(async () => {
	if (!resolved) await promise

	setCounter(counter - 1)
})
