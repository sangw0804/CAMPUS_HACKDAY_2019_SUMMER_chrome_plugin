// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/*global chrome*/
const CLIENT_ID = "NI41cbaDMe0IZTlJGd0_"
const CLIENT_SECRET = "Q45Ev78EGp"

chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(async function (msg) {
        console.log(msg.search_text)
        var data = await $.ajax({
            type: 'get',
            url: 'https://openapi.naver.com/v1/search/movie.json?query=' + msg.search_text,
            headers: { "X-Naver-Client-Id": CLIENT_ID, "X-Naver-Client-Secret": CLIENT_SECRET },
        })
        port.postMessage({ movie_data: data.items[0] })
    });
});
// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         var tab_id=chrome.browserAction.getPopup().tabIndex()
//         chrome.tabs.sendMessage(tab_id, request, function(response) {
//             console.log("@@@@@@@@@@@@");
//             sendResponse(response)
//         });
// });