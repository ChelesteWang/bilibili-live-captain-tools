const axios = require('axios')
const roomid = "146088"
const ruid = "642922"
const url = `https://api.live.bilibili.com/xlive/app-room/v2/guardTab/topList?roomid=${roomid}&ruid=${ruid}&page_size=30`

const Captin = {
    1: '总督',
    2: '提督',
    3: '舰长'
}

const reqPromise = url => axios.get(url);

let CaptinList = []
let UserList = []

async function crawler(URL, pageNow) {
    const res = await reqPromise(URL);
    if (pageNow == 1) {
        CaptinList = CaptinList.concat(res.data.data.top3);
    }
    CaptinList = CaptinList.concat(res.data.data.list);
}


function getMaxPage(res) {

    const Info = res.data.data.info
    const { page: maxPage } = Info
    return maxPage
}


function getUserList(res) {

    for (let item of res) {
        const userInfo = item
        const { uid, username, guard_level } = userInfo
        UserList.push({ uid, username, Captin: Captin[guard_level] })
    }
    console.log(res.length)
    console.log(UserList)
}

async function main() {
    const maxPage = await reqPromise(`${url}&page=1`).then(getMaxPage)
    for (let pageNow = 1; pageNow < maxPage+1; pageNow++) {
        const URL = `${url}&page=${pageNow}`;
        await crawler(URL, pageNow);
    }
    getUserList(CaptinList)
}

main()

function search(ruid, UserList) {
    for (let i = 0; i < UserList.length; i++) {
        if (UserList[i].ruid === ruid) {
            return UserList[i];
        }
    }
    return 0
}

search()
