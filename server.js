const Koa = require('koa');
const app = new Koa();
const path = require('path')
const router = require('koa-router')();
const index = require('./index')
const views = require('koa-views')



app.use(views(path.join(__dirname, './'), {
    extension: 'ejs'
}))
app.use(router.routes());


router.get('/api/captin', async (ctx, next) => {
    const UID = ctx.request.query.uid
    console.log(UID)
    const Info = await index.main(parseInt(UID))
    await ctx.render('index', {
        Info,
    })
});

app.listen(3000);