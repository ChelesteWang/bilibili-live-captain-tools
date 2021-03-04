const axios = require('axios')
const roomid = "146088"
const ruid = "642922"
const Captin = {
    1: '总督',
    2: '提督',
    3: '舰长'
}

let CaptinList = []
let UserList = []

async function crawler(URL, pageNow) {

    if (pageNow == 1) {
        axios.get(URL).then((res) => {
            CaptinList = CaptinList.concat(res.data.data.top3)
            return res
        }).then(getInfo)
    }
    axios.get(URL).then(getCaptin).then(getUser).catch((err) => {
        console.error(err);
    })

    return CaptinList
}

function getCaptin(res) {

    CaptinList = CaptinList.concat(res.data.data.list)
    return CaptinList
}

function getInfo(res) {

    const Info = res.data.data.info
    const { num: captinNum, page: maxPage } = Info
    console.log(captinNum, maxPage)
    return res
}


function getUser(res) {

    for (let item of res) {
        const userInfo = item
        const { uid, username, guard_level } = userInfo
        // console.log(uid, username, Captin[guard_level])
        UserList.push({ uid, username, Captin: Captin[guard_level] })
    }
    console.log(res.length)
    console.log(UserList)
}

async function main() {

    for (let pageNow = 1; pageNow < 26; pageNow++) {
        const URL = `https://api.live.bilibili.com/xlive/app-room/v2/guardTab/topList?roomid=${roomid}&page=${pageNow}&ruid=${ruid}&page_size=30`
        let a = await crawler(URL, pageNow)
    }
}

main()
