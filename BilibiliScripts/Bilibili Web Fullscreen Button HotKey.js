// ==UserScript==
// @name         Bilibili Web Fullscreen Button HotKey
// @version      1.0
// @description  Add the ability to control the video in web fullscreen by pressing N key
// @author       SDSC0623
// @match        *://www.bilibili.com/video/*
// @icon         https://i0.hdslb.com/bfs/static/jinkela/long/images/favicon.ico
// ==/UserScript==
let webFullButton;
let menuList;
(function() {
    'use strict';
    menuList = document.getElementsByClassName('bpx-player-video-wrap')[0];
    menuList.addEventListener('mouseup', menuListener);
    document.querySelector('video').addEventListener('progress', buttonListener);
    document.addEventListener('keydown', keyboardPress, true);
})();

function buttonListener() {
    webFullButton = document.getElementsByClassName('bpx-player-ctrl-web')[0];
    if(webFullButton){
        document.querySelector('video').removeEventListener('progress', buttonListener);
        init();
    }
}

function menuListener(e) {
    if (e.button === 2){
        setTimeout(() => {
            document.getElementsByClassName('bpx-player-contextmenu')[0].children[3].onclick = function () {
                let hotKeyList = document.getElementsByClassName('bpx-player-hotkey-panel-content')[0];
                let hotKeyItem = hotKeyList.children[0].cloneNode(true);
                hotKeyItem.children[0].innerHTML = 'N';
                hotKeyItem.children[1].innerHTML = '网页全屏/退出网页全屏';
                let index = 0;
                for (index = 0; index < hotKeyList.children.length; index++){
                    let temp = hotKeyList.children[index];
                    if (temp.children[0].innerHTML === 'F' && temp.children[1].innerHTML === '全屏/退出全屏'){
                        break;
                    }
                }
                hotKeyList.insertBefore(hotKeyItem, hotKeyList.children[index]);
            }
        }, 50);
        menuList.removeEventListener('mouseup', menuListener);
    }
}

function init() {
    webFullButton.onclick = function(){
        addToolTip();
    }
    addToolTip();
    console.log('Bilibili Web Fullscreen Button HotKey 加载完成，绑定快捷键为 N ')
}

async function keyboardPress(e) {
    const activeElement = document.activeElement;
    const isEditable = (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.tagName === 'SELECT' ||
        activeElement.isContentEditable
    );

    if (e.code === 'KeyN' && !e.ctrlKey && !e.altKey && !e.metaKey && !isEditable) {
        await webFullButton.click();
        addToolTip();
    }
}

function addToolTip() {
    document.getElementsByClassName('bpx-player-tooltip-title').forEach(temp => {
        if(temp.innerHTML === '网页全屏' || temp.innerHTML === '退出网页全屏'){
            temp.innerHTML += ' (n)';
        }
    })
}
