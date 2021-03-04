const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const index = require('./index')
app.use(router.routes());
router.get('/api/captin', async (ctx, next) => {
    const UID = ctx.request.querystring
    console.log(UID)
    ctx.body = await index.main(parseInt(UID))
});

app.listen(3000);